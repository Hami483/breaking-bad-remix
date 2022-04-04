import axios from 'axios'

export async function getAllEpisodes(){
    const response = await fetch(`https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad`)

    const episodes = await response.json()

    return episodes;
}

export async function getEpisodeById(id){
    const response = await fetch(`https://www.breakingbadapi.com/api/episodes/${id}`)

    const episode = await response.json()

    return episode; 
}

export async function getCharacterByName(name){
    const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${name}`)

    const character = await response.json()

    // console.log('character',character)

    return character;
}

export async function getAllCharacters(name=''){
    const response = await fetch(name ? `https://www.breakingbadapi.com/api/characters?name=${name}`  :`https://www.breakingbadapi.com/api/characters`)

    const characters = await response.json()

    return characters;
}

export async function getCharacterById(id){
    const response = await fetch(`https://www.breakingbadapi.com/api/characters/${id}`)

    const character = await response.json()

    return character;
}

//using axios

// export async function getAllEpisodes(){
//     const response = await axios.get(`https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad`)

//     const episodes = response.data

//     return episodes;
// }

// export async function getEpisodeById(id){
//     const response = await axios.get(`https://www.breakingbadapi.com/api/episodes/${id}`)

//     const episode = response.data

//     return episode; 
// }

// export async function getCharacterByName(name){
//     const response = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${name}`)

//     const character = response.data

//     return character;
// }

// export async function getAllCharacters(name=''){
//     const response = await axios.get(name ? `https://www.breakingbadapi.com/api/characters?name=${name}`  :`https://www.breakingbadapi.com/api/characters`)

//     const characters = response.data

//     return characters;
// }

// export async function getCharacterById(id){
//     const response = await axios.get(`https://www.breakingbadapi.com/api/characters/${id}`)

//     const character = response.data

//     return character;
// }