import { InviteUserForm } from "@/modules/accounts/components/InviteUserForm";
import { InviteUser } from "@/modules/accounts/service/invite-user/feature";

export default async function InviteUserFormPage() {
  return (
    <InviteUserForm
      domains={[]}
      exclusions={[]}
      onSubmit={async (state: InviteUser.FormState, formData: FormData) => {
        "use server";
        console.log(Object.fromEntries(formData.entries()));
        return {
          type: "success",
        };
      }}
    />
  );
}
