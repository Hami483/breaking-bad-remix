import { Form, Link, redirect, useLoaderData } from "remix"
import { getAllCharacters } from "~/api/episodes"
import { authenticator } from "~/auth.server";
import { getSession } from "~/sessions.server";

export const loader = async ({request}) => {
    const user = await authenticator.isAuthenticated(request);
    const session = await getSession(
    request.headers.get("Cookie")
  );
    if (!session.has("userId") && !user) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }

    const url = new URL(request.url)

    const name = url.searchParams.get('name')

    const characters = await getAllCharacters(name)

    return { characters }
}

export default function Character(){
    const {characters} = useLoaderData()

    // console.log('characters',characters)
    return(
        <div className="p-16 font-sans">
            <h1 className="text-5xl font-bold text-center">All Characters</h1>
          

            <Form method="get" reloadDocument className="py-5"> 
                <label className="font-bold">
                <input type="text" name="name" placeholder="Type a character name..."
            className="border-2 rounded py-2 px-3"/></label>
                <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Search
        </button>
            </Form>

            <div className="grid grid-cols-4 gap-4">
        {characters.map((character) => (
          <Link
            title={character.name}
            key={character.char_id}
            to={`${character.char_id}`}
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            prefetch="intent"
          >
            <div>{character.name}</div>
            <img src={character.img} alt={character.name} style={{height:'271px'}}/>
          </Link>
        ))}
      </div>
        </div>
    )
}