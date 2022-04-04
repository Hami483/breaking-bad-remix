export async function getComments(episodeId) {
  const response = await fetch(
    `http://localhost:3001/comments?episodeId=${episodeId}`
  );

  const comments = await response.json()

  return comments;
}

export async function addComment(data) {
  const response = await fetch('http://localhost:3001/comments', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const comment = await response.json()

  return comment;
}