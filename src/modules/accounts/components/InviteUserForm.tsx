"use client";
import { z } from "zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InviteUser } from "../service/invite-user/feature";

interface InviteUserFormProps {
  domains: string[];
  exclusions: string[];
  onSubmit: (
    previousValue: InviteUser.FormState,
    formData: FormData
  ) => Promise<InviteUser.FormState>;
}

export function InviteUserForm({
  domains,
  exclusions,
  onSubmit,
}: InviteUserFormProps) {
  const [state, formAction] = useFormState(onSubmit, {
    type: "success",
  });
  const { register, formState } = useForm<InviteUser.Input>({
    resolver: zodResolver(
      InviteUser.inputSchema.extend({
        emailAddress: z
          .string()
          .email()
          .refine(
            (emailAddress) => {
              const domain = emailAddress.split("@")[1];
              return (
                domains.includes(domain) && !exclusions.includes(emailAddress)
              );
            },
            {
              message: "Invalid email address",
            }
          ),
      })
    ),
  });
  return (
    <form>
      <section>
        <input {...register("emailAddress")} className="text-black py-4" />
      </section>
      <button type="submit" formAction={formAction}>
        Submit
      </button>
    </form>
  );
}
