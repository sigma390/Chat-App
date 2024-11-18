import axiosInstance from './api-client';

class HttpService {
  endPoint;
  constructor(endPoint) {
    this.endPoint = endPoint;
  }
  //Get Method
  get = async (id) => {
    return axiosInstance.get(this.endPoint + '/' + id);
  };
  //Post method

  getAll = async () => {
    return axiosInstance.get(this.endPoint);
  };

  post = async (path, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Default content type
      },
    };
    return axiosInstance.post(this.endPoint + path, data, config);
  };
  //Create User
  create = async (path, data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Default content type
      },
    };
    return axiosInstance.post(this.endPoint + path, data, config);
  };
}

export default HttpService;
