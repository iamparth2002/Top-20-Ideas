export const upvote = (id) => {
  const votes = localStorage.getItem('votes')
    ? JSON.parse(localStorage.getItem('votes'))
    : {
        upvotes: [],
        downvotes: [],
      };

  if (votes.upvotes.indexOf(id) !== -1) return false;

  votes.upvotes.push(id);
  const downvotes = votes.downvotes.filter((voteId) => voteId !== id);
  votes.downvotes = downvotes;

  localStorage.setItem('votes', JSON.stringify(votes));
  return true;
};
export const downvote = (id) => {
  const votes = localStorage.getItem('votes')
    ? JSON.parse(localStorage.getItem('votes'))
    : {
        upvotes: [],
        downvotes: [],
      };

  if (votes.downvotes.indexOf(id) !== -1) return false;

  votes.downvotes.push(id);
  const upvotes = votes.upvotes.filter((voteId) => voteId !== id);
  votes.upvotes = upvotes;

  localStorage.setItem('votes', JSON.stringify(votes));
  return true;
};

export const alreadyVoted = (id) => {
  const votes = JSON.parse(localStorage.getItem('votes'));
  if (!votes) {
    return false;
  }
  return votes?.upvotes?.find((voteId) => voteId == id);
};
export const alreadyDownVoted = (id) => {
  const votes = JSON.parse(localStorage.getItem('votes'));
  if (!votes) {
    return false;
  }

  return votes?.downvotes?.find((voteId) => voteId == id);
};
