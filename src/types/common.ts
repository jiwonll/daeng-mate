export type InfoCardProps = {
  image: string;
  title: string;
  description: string;
  imageClassName?: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type OnboardingForm = {
  nickname: string;
  gender: string;
  region: string;
  dogName: string;
  dogGender: string;
  dogAge: string;
  breed: string;
  neutered: boolean | null;
  personality: string;
};
