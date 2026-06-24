"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer } from "@/types";
import { useCustomersStore } from "@/store/useCustomersStore";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["active", "inactive", "pending"]),
  spend: z.coerce.number().min(0, "Spend cannot be negative"),
});

type FormValues = z.infer<typeof schema>;

const COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];

export function CustomerFormDialog({
  open,
  onOpenChange,
  customer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
}) {
  const { addCustomer, updateCustomer } = useCustomersStore();
  const isEdit = !!customer;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      status: "pending",
      spend: 0,
    },
  });

  const [status, setStatus] = React.useState<Customer["status"]>("pending");

  React.useEffect(() => {
    if (open) {
      reset({
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        company: customer?.company ?? "",
        status: customer?.status ?? "pending",
        spend: customer?.spend ?? 0,
      });
      setStatus(customer?.status ?? "pending");
    }
  }, [open, customer, reset]);

  const onSubmit = (values: FormValues) => {
    if (isEdit && customer) {
      updateCustomer(customer.id, { ...values, status });
      toast.success("Customer updated");
    } else {
      addCustomer({
        id: `c${Date.now()}`,
        ...values,
        status,
        joined: new Date().toISOString().slice(0, 10),
        avatarColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      toast.success("Customer added");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent open={open}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit customer" : "Add customer"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update this customer's details." : "Add a new customer to your workspace."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" {...register("name")} placeholder="Amelia Frost" />
            {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="amelia@company.com" />
            {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register("company")} placeholder="Frost Design" />
            {errors.company && <p className="text-xs text-danger mt-1">{errors.company.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Customer["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="spend">Total spend ($)</Label>
              <Input id="spend" type="number" step="1" {...register("spend")} />
              {errors.spend && <p className="text-xs text-danger mt-1">{errors.spend.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save changes" : "Add customer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
