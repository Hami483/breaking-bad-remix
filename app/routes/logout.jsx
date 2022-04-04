import { redirect } from "remix";
import { authenticator } from "~/auth.server";
import { destroySession, getSession } from "~/sessions.server";


export const action = async ({
  request,
}) => {
//   return logout(request);

const session = await getSession(
    request.headers.get("Cookie")
  );
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const loader = async () => {
  return redirect("/login");
};