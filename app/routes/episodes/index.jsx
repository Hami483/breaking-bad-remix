import { Link, redirect, useLoaderData } from "remix";
import { getAllEpisodes } from "~/api/episodes"
import { authenticator } from "~/auth.server";
import { getSession } from "~/sessions.server";
import banner1 from '../../../public/images/img1.jpg'
import banner2 from '../../../public/images/img2.jpg'

export const loader =async ({request}) => {
const user = await authenticator.isAuthenticated(request);
 const session = await getSession(
    request.headers.get("Cookie")
  );
    if (!session.has("userId") && !user) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }

 const episodes = await getAllEpisodes()

 return {episodes};
}

export default function Episodes(){
    const { episodes } = useLoaderData()
    // console.log('episodes in index pg',episodes)

    const imagesArr = [ banner1,banner2 ]
   
    return(
        <div className="p-16 font-sans">
            <h1 className="text-5xl font-bold text-center mb-5">Breaking Bad</h1>

            <div className="grid grid-cols-4 gap-4">
        {episodes.map((episode) => (
          <Link
            title={episode.title}
            key={episode.episode_id}
            to={`${episode.episode_id}`}
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            prefetch="intent"
          >
            <div>{episode.title}</div>
            <img src={episode.episode_id % 2 === 0 ? imagesArr[0] : imagesArr[1]} alt={episode.title} />
          </Link>
        ))}
      </div>
        </div>
    )
}