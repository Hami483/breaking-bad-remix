import { Link, redirect, useLoaderData } from "remix"
import { getCharacterById } from "~/api/episodes"
import { authenticator } from "~/auth.server";
import { getSession } from "~/sessions.server";

export const loader = async ({request,params}) => {
    const user = await authenticator.isAuthenticated(request);
    const session = await getSession(
    request.headers.get("Cookie")
  );
    if (!session.has("userId") && !user) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }
    const character = await getCharacterById(params.characterId)

    return { character }
}

export default function CharacterId(){

    const { character } = useLoaderData()
    // console.log('character',character)

    return(
        <section className="container p-6 mx-auto bg-white dark:bg-gray-800">
        <Link to={'/characters'} className="text-l font-medium text-gray-800 capitalize dark:text-white md:text-2xl mb-4 text-center hover:underline">Go Back</Link>
        <h2 className="text-xl font-medium text-gray-800 capitalize dark:text-white md:text-2xl mb-4 text-center">{character[0].name}</h2>

        <div className="flex items-center justify-center">
            <div className="">
                <div className="w-full max-w-xs text-center">
                    <img className="object-cover object-center w-full mx-auto rounded-lg" src={character[0].img} alt={character[0].name}/>

                    <div className="mt-2">
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Birthday: {character[0].birthday}</h3>
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Portrayed: {character[0].portrayed}</h3>
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">NickName: {character[0].nickname}</h3>
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Status:  {character[0].status}</h3>  
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}