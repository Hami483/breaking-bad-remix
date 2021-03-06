export async function getAllEpisodes(){
    const response = await fetch(`https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad`)

    return response.json()
}

export async function getEpisodeById(id){
    const response = await fetch(`https://www.breakingbadapi.com/api/episodes/${id}`)

    return response.json()
}

export async function getCharacterByName(name){
    const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${name}`)

    return response.json()
}

export async function getAllCharacters(name=''){
    const response = await fetch(name ? `https://www.breakingbadapi.com/api/characters?name=${name}`  :`https://www.breakingbadapi.com/api/characters`)

    return response.json()
}

export async function getCharacterById(id){
    const response = await fetch(`https://www.breakingbadapi.com/api/characters/${id}`)

   return response.json()
}