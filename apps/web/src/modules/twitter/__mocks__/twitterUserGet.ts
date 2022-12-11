const userData = {
  data: {
    id: '1070750548608147456',
    name: 'Pablo Jonatan',
    username: 'pjonatansr',
  },
};

export const userProfile = (username: string, accessToken: string) => {
  return new Promise((res) => {
    process.nextTick(() => {
      if (!accessToken) {
        throw '401';
      }

      if (username !== 'pjonatansr') {
        res({ data: {} });
      }

      res(userData);
    });
  });
};
