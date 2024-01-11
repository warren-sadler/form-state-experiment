import { z } from "zod";

const emailInUseError = z.object({
  error: z.literal("email-in-use"),
  message: z.string(),
});

const success = z.object({
  type: z.literal("success"),
  error: z.undefined(),
});

const failure = z.object({
  type: z.literal("failure"),
  error: emailInUseError,
});

export const schema = z.discriminatedUnion("type", [success, failure]);

export type FormState = z.infer<typeof schema>;

export const validate = (value: unknown): FormState => {
  return schema.parse(value);
};

export const isValid = (value: unknown): value is FormState => {
  try {
    validate(value);
    return true;
  } catch {
    return false;
  }
};
