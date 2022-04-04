import { Outlet, redirect, useLoaderData } from "remix"
import { addComment, getComments } from "~/api/comments"
import { getEpisodeById } from "~/api/episodes"
import { authenticator } from "~/auth.server"
import CharacterList from "~/components/CharacterList"
import CommentsList from "~/components/CommentList"
import FilmBanner from "~/components/FilmBanner"
import { getSession } from "~/sessions.server"
import { getUser } from "~/utils/user.server"

export const loader = async({request,params}) => {
    const user = await authenticator.isAuthenticated(request);
    const session = await getSession(
    request.headers.get("Cookie")
  );
    if (!session.has("userId") && !user) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login");
  }

    

    const episode = await getEpisodeById(params.episodeId)

    const comments = await getComments(params.episodeId)

    return { episode,comments }
}

export const action = async ({request, params}) => {
    let user;

    const isUser = await authenticator.isAuthenticated(request);

    if(isUser){
        const body = await request.formData();

  const comment = { 
    name:  isUser.displayName,
    message: body.get('message') ,
    episodeId: params.episodeId
  }

  const errors = { message: ''};

  if (!comment.message) {
    errors.message = 'Please provide a comment';
  }

  if (errors.name || errors.message) {
    const values = Object.fromEntries(body);
    return { errors, values }; 
  }

  await addComment(comment);

  return redirect(`/episodes/${params.episodeId}`);
    }

    //else
 
    const session = await getSession(
    request.headers.get("Cookie")
  );

    const userId = session.get('userId')
   user = await getUser(userId)
  
  const body = await request.formData();

  const action = body.get('_action')
  // console.log('-------action----',action)

  const comment = { 
    name:  user.name,
    message: body.get('message') ,
    episodeId: params.episodeId
  }

  const errors = { message: ''};

  if (!comment.message) {
    errors.message = 'Please provide a comment';
  }

  if (errors.name || errors.message) {
    const values = Object.fromEntries(body);
    return { errors, values }; 
  }

  await addComment(comment);

  return redirect(`/episodes/${params.episodeId}`);

  // return {}
}

export default function EpisodeId(){
    const { episode,comments } = useLoaderData()
    // console.log('comments',comments)
    return(
        <div>
            <FilmBanner episode={episode}/>

            <div className="p-10">
                <p>Season - {episode[0].season}</p>
                <p>Air Date - {episode[0].air_date}</p>
                <p>Episode - {episode[0].episode}</p>

                <div className="flex py-5 space-x-5">
                    <CharacterList characters={episode[0].characters}/>

                    <div className="flex-1 flex flex-col justify-between">
                        <Outlet/>

                       <CommentsList episodeId={episode[0].episode_id} comments={comments || []} />
                    </div>
                </div>
            </div>
        </div>
    )
}