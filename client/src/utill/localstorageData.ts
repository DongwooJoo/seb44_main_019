export const getMemberIdFromLocalStorage = () => {
  const memberId = localStorage.getItem('id');
  return memberId;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};
