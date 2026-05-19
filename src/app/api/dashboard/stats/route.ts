import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: NextRequest
) {
  try {
    const token =
      req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload =
      await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const products =
      await prisma.product.findMany({
        where: {
          organizationId:
            payload.organizationId,
        },
      });

    const totalProducts =
      products.length;

    const lowStockProducts =
      products.filter(
        (product) =>
          product.quantity <= 5
      ).length;

    const inventoryValue =
      products.reduce(
        (acc, product) =>
          acc + product.quantity,
        0
      );

    return NextResponse.json({
      totalProducts,
      lowStockProducts,
      inventoryValue,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}