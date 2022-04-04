import { Form, json, Link, redirect, useActionData, useCatch } from "remix";
import { commitSession, getSession } from "~/sessions.server";
import { login } from "~/utils/user.server";
import { SocialsProvider } from "remix-auth-socials";
import { authenticator } from "~/auth.server";

export const loader = async ({request}) => {
    const session = await getSession(
    request.headers.get("Cookie")
  );
    if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }
  return {}
}

export const action =async({request}) => {
    const session = await getSession(request.headers.get("Cookie"))

    const form = await request.formData()

    const email = form.get('email')
    const password = form.get('password')

    const errors = {email: '', password: ''};

  if (!email) {
    errors.email = 'Please provide your Email Address';
  }

  if (!password) {
    errors.password = 'Please provide a password';
  }

  if (errors.email || errors.password) {
    const values = Object.fromEntries(form);
    return { errors, values }; 
  }

    const user=  await login(email,password)

    if(!user){
        // return json('Invalid Credentials', { status: 401 })
        throw new Error("Invalid Credentials");
    }

    // console.log('user in login act',user)

    session.set('userId',user._id)

    return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login(){
    const actionData = useActionData();

     const inputStyle = (fieldName) =>
    `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
      actionData?.errors[fieldName] ? ' border-red-500' : ''
    }`;


    return(
        // <div>
        //     Login
            
        //     <Form method="POST">
        //         <input type="email" name="email" placeholder="email"/>
        //         <input type="password" name="password" placeholder="password"/>
        //         <button type="submit">Login</button>
        //     </Form>
        // </div>
        <div style={{display:'grid',placeItems:'center',minHeight:'100vh',}}>

        <div className="w-full max-w-xs">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Form  method="POST">
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Email
                </label>
                <input className={inputStyle('email')} id="email" type="email" placeholder="Email" name="email"/>
                {actionData?.errors.email && (
                            <p className="text-red-500">{actionData.errors.email}</p>
                    )}
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input className={inputStyle('password')} id="password" type="password" placeholder="******************" name="password"/>
                {actionData?.errors.password && (
                            <p className="text-red-500">{actionData.errors.password}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Login
                </button>
                <p>New User? <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to='/register'>
                    Register
                </Link></p>
                
                </div>
            </Form>

            <Form
      method="post"
      action={`/auth/${SocialsProvider.GOOGLE}`}
      
    >
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-2">Login with Google</button>
    </Form>
            </div>
        </div>

        </div>
    )
}

export function ErrorBoundary({ error }) {
  return (
    <div className="p-3">
      <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Uh oh... Login Error!
        </div>
        <p>{error?.message}</p>
        <Link to={'/login'} className="text-xl mt-2 text-blue-500 text-center">Login</Link>
      </div>
    </div>
  );
}