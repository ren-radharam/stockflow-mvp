import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

import { loginSchema } from "@/validators/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData =
      loginSchema.parse(body);

    const user =
      await prisma.user.findUnique({
        where: {
          email: validatedData.email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        validatedData.password,
        user.password
      );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token = signToken({
      userId: user.id,
      organizationId: user.organizationId,
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error:
            error.issues[0]?.message ||
            "Invalid data",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}