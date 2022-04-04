import { NavLink } from "remix";

export default function CharacterList({characters}){
    // console.log('characters',characters)
    return(
        <div className="flex-1 max-w-md">
      <h3 className="text-3xl">Characters</h3>

      <ul className="flex flex-col space-y-3 my-3">
        {characters?.map((character) => (
          <li key={character}>
            <NavLink
              to={`characters/${character}`}
            //   to={'characters/' + character}
              prefetch="intent"
              className={({ isActive }) =>
                `w-full hover:underline p-3 rounded border border-slate-400 inline-block ${
                  isActive
                    ? 'bg-slate-300 text-black font-bold border-2'
                    : 'text-blue-500 '
                } `
              }
            >
              {character}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
    )
}