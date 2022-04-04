import { Form, Link, redirect, useActionData } from "remix";
import { commitSession, getSession } from "~/sessions.server";
import { register } from "~/utils/user.server";

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

    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')

    const errors = {email: '', password: '',name:''};

  if (!name) {
    errors.name = 'Please provide your name';
  }

  if (!email) {
    errors.email = 'Please provide your Email Address';
  }

  if (!password) {
    errors.password = 'Please provide a password';
  }

  if (errors.email || errors.password || errors.name) {
    const values = Object.fromEntries(form);
    return { errors, values }; 
  }


  const user = await register(name,email,password)
  // console.log('user',user)

  if(user === undefined){
      throw new Error("Email Already in use");
  }

  session.set('userId',user._id)

    return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });

}

export default function Register(){
     const actionData = useActionData();

     const inputStyle = (fieldName) =>
    `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
      actionData?.errors[fieldName] ? ' border-red-500' : ''
    }`;
    return(
        <div style={{display:'grid',placeItems:'center',minHeight:'100vh',}}>

            <div className="w-full max-w-xs">
  <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Name
      </label>
      <input className={inputStyle('name')} id="username" type="text" placeholder="Name" name="name"/>
      {actionData?.errors.name && (
                <p className="text-red-500">{actionData.errors.name}</p>
        )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
        Register
      </button>
      <p>Existing User? <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to='/login'>
        Login
      </Link></p>
      
    </div>
  </Form>
        </div>

        </div>
    )
}


export function ErrorBoundary({ error }) {
  return (
    <div className="p-3">
      <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Uh oh... Register Error!
        </div>
        <p>{error?.message}</p>
        <Link to={'/register'} className="text-xl mt-2 text-blue-500 text-center">Register</Link>
      </div>
    </div>
  );
}