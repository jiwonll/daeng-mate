export type Profile = {
  nickname: string;
  region: string;
  temperature: number;
  created_at: string;
  is_onboarded: boolean;
};

export type Dog = {
  id: string;
  user_id: string;
  photo_url: string | null;
  name: string;
  breed: string | null;
  birth: string | null;
  gender: string | null;
  weight: number | null;
  size: string | null;
  neutered: boolean;
  personality: string | null;
  created_at: string;
};
