import axios from 'axios';
import store from '../store';

const defaultTimeout = 40000;

const handleRequest = (config: any) => {
  const accessToken = store?.getState()?.user.token;
  const addToken = config.url !== '/api/user/login';

  if (addToken) {
    console.log(addToken, 'addtoken');

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    };
  }
};

const createApiInstance = (baseURL: any, name = '') => {
  const api = axios.create({baseURL, timeout: defaultTimeout});

  if (!baseURL) {
    throw new Error(
      `${name} baseURL not set during built. Please, set baseURL`,
    );
  }

  api.interceptors.request.use(handleRequest);

  api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return error;
    },
  );

  return {
    instance: api,
  };
};

export default createApiInstance;
