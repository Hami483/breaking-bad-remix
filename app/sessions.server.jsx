import { createCookieSessionStorage } from "remix";

export const sessionStorage  =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
        //firebase token
      name: "token",

      // all of these are optional
      expires: new Date(Date.now() + 3600),
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "lax",
      secrets: ["tacos"],
      secure: true
    }
  });

export const { getSession, commitSession, destroySession } = sessionStorage;