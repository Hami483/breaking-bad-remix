import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import styles from '~/tailwind.css'
import { authenticator } from "./auth.server";
import { getSession } from "./sessions.server";
import { getUser } from "./utils/user.server";

export const loader = async ({request}) => {
  let user;
  const isUser = await authenticator.isAuthenticated(request);
  // console.log('isuser',isUser)

  if(isUser){
    user = isUser
    return { user }
  }

  const session = await getSession(
    request.headers.get("Cookie")
  );
  
  const userId = session.get('userId')

   user =await getUser(userId)

    return { user }
}

export function meta() {
  return {
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
  };
}

export function links(){
  return [
    {rel:'stylesheet', href:styles}
  ]
}

export default function App() {
  const { user } = useLoaderData()

  // console.log('user root',user)
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
            {
              user ? <span href="#" className="text-gray-800 transition-colors duration-200 transform dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6">Welcome {user.displayName || user.name}</span> : ''
            }

            <Link prefetch="intent" to="/episodes" className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ">Episodes</Link>

            <Link prefetch="intent" to="/characters" className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Characters</Link>

            {
              user ? user.name ? <Form method="POST" action="/logout">
              <button  className="py-1.5 px-4 transition-colors bg-gray-50 border active:bg-blue-800 font-medium border-gray-200 hover:text-white text-blue-600 hover:border-blue-700 rounded-lg hover:bg-blue-600 disabled:opacity-50" type="submit">Logout</button>
            </Form> : <Form method="POST" action="/firebase-logout">
              <button  className="py-1.5 px-4 transition-colors bg-gray-50 border active:bg-blue-800 font-medium border-gray-200 hover:text-white text-blue-600 hover:border-blue-700 rounded-lg hover:bg-blue-600 disabled:opacity-50" type="submit">Logout</button>
            </Form> : <>
             <Link prefetch="intent" to="/login" className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Login</Link>

            <Link prefetch="intent" to="/register" className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Register</Link>
            </>
            }

        </div>
    </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
