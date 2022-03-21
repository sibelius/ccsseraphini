export const getTwitterAuthorization = (authorization: string) => {
  if (authorization.includes('Bearer')) {
    return authorization;
  }

  return `Bearer ${authorization}`;
};
