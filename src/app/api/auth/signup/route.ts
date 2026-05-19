import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { signupSchema } from "@/validators/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      10
    );

    const organization = await prisma.organization.create({
      data: {
        name: validatedData.organizationName,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        organizationId: organization.id,
      },
    });

    const token = await signToken({
      userId: user.id,
      organizationId: organization.id,
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
          error: error.issues[0]?.message || "Invalid data",
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