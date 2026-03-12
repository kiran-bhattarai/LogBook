export const createProtectedFetch = (getToken, refreshToken) => {
  return async (url, options = {}) => {
    let token = getToken();

    if (!token) token = await refreshToken();

    const config = {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      credentials: "include"
    };

    let res = await fetch(url, config);

    if (res.status === 401) {
      const newToken = await refreshToken();

      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
        res = await fetch(url, config);
      }
    }

    return res;
  };
};