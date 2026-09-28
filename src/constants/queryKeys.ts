export const queryKeys = {
  profile: {
    all: ["profile"] as const,
    get: (userId?: string) => ["profile", userId] as const,
    email: ["profile", "email"] as const,
  },
  dog: {
    all: ["dog"] as const,
    get: (dogId?: string) => ["dog", dogId] as const,
    byUser: (userId?: string) => ["dog", "user", userId] as const,
  },
};
