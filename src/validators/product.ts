import { z } from "zod";

export const createProductSchema =
  z.object({
    name: z.string().min(1),
    sku: z.string().min(1),
    description: z.string().optional(),

    quantity: z.number().min(0),

    costPrice: z.number().optional(),
    sellingPrice: z.number().optional(),

    lowStockThreshold:
      z.number().optional(),
    });