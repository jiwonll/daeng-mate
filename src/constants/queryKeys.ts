export const queryKeys = {
  profile: {
    all: ["profile"] as const,
    get: (userId?: string) => ["profile", userId] as const,
    email: ["profile", "email"] as const,
  },
};
