"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddProductDialog() {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      sku: "",
      quantity: 0,
    });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/products",
        {
          method: "POST",
          credentials: "include",
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
        "Product created"
      );

      setOpen(false);

      window.location.reload();
    } catch {
      toast.error(
        "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-black
            transition
            hover:bg-zinc-200
        "
        >
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </DialogTrigger>

      <DialogContent
        className="
          border-white/10
          bg-zinc-950
          text-white
        "
      >
        <DialogHeader>
          <DialogTitle>
            Add Product
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
              ? "Creating..."
              : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}