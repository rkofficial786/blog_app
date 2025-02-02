import axios from 'axios';
import store from '../store';

const defaultTimeout = 40000;

const handleRequest = (config) => {
  const accessToken = store.getState().auth.token;
  const addToken = config.url !== '/api/user/login';

  if (addToken) {
    console.log(addToken, 'addtoken');

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    };
  } else {
    return {
      ...config,
      headers: {
        ...config.headers
      }
    };
  }
};
// eslint-disable-next-line no-unused-vars
// const handleErrorResponse = async (error) => {
//   const { config, response } = error;
//   if (noAuthCheckUrls.indexOf(config?.url) > -1 || isNoAuth(config?.url)) {
//     const { status = "", error, meta } = response?.data || {};
//     if (status === API_STATUS.ERROR) {
//       if (meta?.errorMessage) {
//         errorToast(meta?.errorMessage);
//       } else {
//         errorToast(error?.detail);
//       }
//     }
//   } else {
//     if (response.status == 401) {
//       logout();
//     }
//     errorToast(error?.detail);
//     return;
//   }
//   throw error;
// };

const createApiInstance = (baseURL, name = '') => {
  const api = axios.create({ baseURL, timeout: defaultTimeout });

  if (!baseURL) {
    throw new Error(`${name} baseURL not set during built. Please, set baseURL`);
  }

  api.interceptors.request.use(handleRequest);

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    }
  );

  return {
    instance: api
  };
};

export default createApiInstance;
