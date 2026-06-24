import { create } from "zustand";
import { Customer } from "@/types";
import { CUSTOMERS } from "@/constants/mock-data";

type CustomersState = {
  customers: Customer[];
  addCustomer: (c: Customer) => void;
  updateCustomer: (id: string, c: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
};

export const useCustomersStore = create<CustomersState>((set) => ({
  customers: CUSTOMERS,
  addCustomer: (c) => set((s) => ({ customers: [c, ...s.customers] })),
  updateCustomer: (id, c) =>
    set((s) => ({
      customers: s.customers.map((x) => (x.id === id ? { ...x, ...c } : x)),
    })),
  deleteCustomer: (id) =>
    set((s) => ({ customers: s.customers.filter((x) => x.id !== id) })),
}));
