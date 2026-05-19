"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
}

interface Props {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;
  product: Product | null;
}

export function EditProductDialog({
  open,
  onOpenChange,
  product,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: product?.name || "",
      sku: product?.sku || "",
      quantity:
        product?.quantity || 0,
    });

    useEffect(() => {
        if (product) {
          setFormData({
            name: product.name,
            sku: product.sku,
            quantity: product.quantity,
          });
        }
      }, [product]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!product) return;

    try {
      setLoading(true);

      const response = await fetch(
        `/api/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success(
        "Product updated"
      );

      onOpenChange(false);

      window.location.reload();
    } catch {
      toast.error(
        "Failed to update product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          border-white/10
          bg-zinc-950
          text-white
        "
      >
        <DialogHeader>
          <DialogTitle>
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>
              Product Name
            </Label>

            <Input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>SKU</Label>

            <Input
              required
              value={formData.sku}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sku: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Quantity
            </Label>

            <Input
              type="number"
              required
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: Number(
                    e.target.value
                  ),
                })
              }
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}