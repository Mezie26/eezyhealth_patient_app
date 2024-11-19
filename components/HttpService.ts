import axios from "axios";  
import {   getUserAuthorizationConfig } from "../hooks/config";
import { baseUrl } from "../shared/baseUrl";
 
 


interface HeadersConfig {
  [key: string]: string; // This allows any string key to be used to access values
}

 
const createHttpService = () => {  
  const config:any =  getUserAuthorizationConfig();
  const get = async (url: string) => { 
    const endpoint = baseUrl + url;
    try {
      const data = await axios.get(endpoint, config);
      return data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const search = async (url: string, params: any) => {
    const endpoint = baseUrl + url + objectToQueryString(params);
    try {
      const data = await axios.get(endpoint, config);
      return data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const deleteRequest = async (url: string) => {
    const endpoint = baseUrl + url;
    try {
      const data = await axios.delete(endpoint, config);
      return data;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const post = async (url: string, data: any) => {
    const endpoint = baseUrl + url;
    try {
      const responseData = await axios.post(endpoint, data, config);
      return responseData;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const put = async (url: string, data: any) => {
    const endpoint = baseUrl + url;
    try {
      const responseData = await axios.put(endpoint, data, config);
      return responseData;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

  const patch = async (url: string, data = {}) => {
    const endpoint = baseUrl + url;
    try {
      const responseData = await axios.patch(endpoint, data, config);
      return responseData;
    } catch (e) {
      handleError(e);
      throw e;
    }
  };

 

const uploadFile = (url: string, data: Record<string, any>, files: Record<string, any>, fileName: string = '') => {
  const headers: HeadersConfig = {
    ...config.headers, // Preserve existing headers
    "content-type": "multipart/form-data",
  };

  const formData = new FormData();
  for (let key in files) {
    if (fileName) {
      formData.append(fileName, files[key]);
    } else {
      formData.append(key, files[key]);
    }
  }
  for (let key in data) {
    formData.append(key, data[key]);
  }
  const endpoint = baseUrl + url;

  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, formData, { headers }) // Pass headers using the 'headers' property
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        handleError(e);
        reject(e);
      });
  });
};

  const handleError = (e: any) => {  
    if (e.response.status === 401 && e.response.statusText === "Unauthorized") {
     
      // window.location.replace("/login");
      // dataService.clearData();
    }  
  };

 const objectToQueryString = (obj: { [key: string]: string | number | boolean }) => {
  let str = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  const query = "?" + str.join("&");
  return query;
 };
    
 const setToken = (newToken: string | null) => {
  config.headers.Authorization = newToken ? `Bearer ${newToken}` : '';
};

    return { 
    setToken,
    get,
    search,
    deleteRequest,
    post,
    put,
    patch,
    uploadFile 
  };
};

export default createHttpService;


 