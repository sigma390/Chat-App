import axiosInstance from './api-client';

class HttpService {
  endPoint;
  constructor(endPoint) {
    this.endPoint = endPoint;
  }
  //Get Method
  get = async (id) => {
    return fetch(this.endPoint + '/' + id)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
  //Post method

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
