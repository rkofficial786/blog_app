import api from '../api';
import taskApiEndpoint from './config';

const taskApi = {
  async createTask(payload: any) {
    return await api.post(`${taskApiEndpoint.createTask}`, payload);
  },
};

export default taskApi;
