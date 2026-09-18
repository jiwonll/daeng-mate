import { create } from "zustand";
import { MateFilterState } from "@/types/mate-post";

export const useMateFilterStore = create<MateFilterState>((set) => ({
  searchTerm: "",
  sizeFilter: "all",
  statusFilter: "all",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSizeFilter: (sizeFilter) => set({ sizeFilter }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
}));
