export type WriteFormData = {
  title: string;
  content: string;
  meeting_place: string;
  meeting_date: string;
  meeting_time: string;
};

export type WriteFormState = WriteFormData & {
  setField: <K extends keyof WriteFormData>(
    field: K,
    value: WriteFormData[K]
  ) => void;
  resetForm: () => void;
  getMeetingTimestamp: () => string | null;
};
