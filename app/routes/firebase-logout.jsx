import { authenticator } from "~/auth.server";

export const action = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};