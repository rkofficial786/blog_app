import api from '../api';
import categoryApiEndpoint from './config';

const categoryApi = {
  async createCategory(payload: any) {
    return await api.post(`${categoryApiEndpoint.createCategory}`, payload);
  },

  async getAllUsersCategory (){
    return await api.get(`${categoryApiEndpoint.getAllUsersCategory}`);
  }
};

export default categoryApi;
