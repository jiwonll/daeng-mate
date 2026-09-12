import { create } from "zustand";
import { WriteFormState, WriteFormData } from "@/types/write";

const initialState: WriteFormData = {
  title: "",
  content: "",
  meeting_place: "",
  meeting_date: "",
  meeting_time: "",
};

export const useWriteStore = create<WriteFormState>((set, get) => ({
  ...initialState,

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  resetForm: () => set(initialState),

  getMeetingTimestamp: () => {
    const { meeting_date, meeting_time } = get();
    if (!meeting_date || !meeting_time) return null;
    return new Date(`${meeting_date}T${meeting_time}:00`).toISOString();
  },
}));
