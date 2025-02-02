import createApiInstance from './createApiInstance';

export const myApi = 'https://rationally-charming-horse.ngrok-free.app';

const api = createApiInstance(myApi, 'Routine Manager');

export default api.instance;