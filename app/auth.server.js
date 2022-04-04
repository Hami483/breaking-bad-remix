import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/sessions.server";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

// Create an instance of the authenticator
// It will take session storage as an input parameter and creates the user session on successful authentication
export const authenticator = new Authenticator(sessionStorage);

// callback function that will be invoked upon successful authentication from social provider
async function handleSocialAuthCallback({ profile }) {
  // create user in your db here
  // profile object contains all the user data like image, displayName, id
  // console.log('profile',profile)

  const name = profile.displayName
  const email = profile.emails[0].value

  // console.log('name',name)
  // console.log('email',email)
//   const displayName= profile.displayName

//   await register({displayName,displayName})

// const user = await createOrUpdateUser(name,email)
// console.log('user in callback',user)
  return profile;
}

// Configuring Google Strategy
authenticator.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ["openid email profile"],
    callbackURL: `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`
  },
  handleSocialAuthCallback
));