import { redirect, useLoaderData } from "remix";
import { getCharacterByName } from "~/api/episodes";
import { authenticator } from "~/auth.server";
import { getSession } from "~/sessions.server";

export async function loader({request,params}){
    const user = await authenticator.isAuthenticated(request);
  const session = await getSession(
    request.headers.get("Cookie")
  );
    if (!session.has("userId") && !user) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }
    return getCharacterByName(params.characterId)
}

export default function Character() {
  const characterDetails = useLoaderData();
  // console.log('characterDetails',characterDetails)
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Character Details</div>
      <div className="p-4 rounded shadow-lg border">
        <div className="text-gray-700 font-bold text-xl mb-2">
          <span>{characterDetails[0].name}</span>
          <img className="inline object-cover w-20 h-20 ml-2 rounded-full" src={characterDetails[0].img} alt="Profile image"/>
        </div>
        <ul className="py-2">
          <li>BirthDay:{' '} {characterDetails[0]?.birthday}</li>
          <li>Series:{' '} {characterDetails[0]?.category}</li>
          <li>NickName:{' '} {characterDetails[0]?.nickname}</li>
          <li>Portrayed:{' '} {characterDetails[0]?.portrayed}</li>
          <li>Status:{' '} {characterDetails[0]?.status}</li>
          {/* <li>Occupation:{' '} {characterDetails[0]?.occupation.map(o => <span className="bg-slate-700/60">{o}</span>)}</li> */}
        </ul>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">Details</div>
      <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Uh oh... Sorry something went wrong!
        </div>
        <p>{error?.message}</p>
      </div>
    </div>
  );
}