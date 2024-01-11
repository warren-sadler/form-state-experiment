import { z } from "zod";

export const schema = z.object({});

export type Output = z.infer<typeof schema>;

export const validate = (value: unknown): Output => {
  return schema.parse(value);
};

export const isValid = (value: unknown): value is Output => {
  try {
    validate(value);
    return true;
  } catch {
    return false;
  }
};
