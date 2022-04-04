import { authenticator } from "~/auth.server.js";
import { SocialsProvider } from "remix-auth-socials";

export const loader = ({ request }) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};