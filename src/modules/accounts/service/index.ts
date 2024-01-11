import { inviteUser } from "./invite-user";

export const accountsService = {
  inviteUser,
} as const;

export type AccountsService = typeof accountsService;
