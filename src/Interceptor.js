import axios from 'axios';

const apiEndpoint = "http://localhost:8000/"

const axiosInstance = axios.create({
  baseURL: apiEndpoint, 
  headers: {
    'Content-Type': 'application/json'
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken=JSON.parse(localStorage.getItem("authTokens"))  
    console.log('interceptor working!')
    console.log("this is token"+accessToken)
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`; 
    }
    console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//    (response) => response,
//    async (error) => {
//      const originalRequest = error.config;
//      console.log('error!'+error)
//      if (error?.response?.status === 401) {
//        console.log('Refresh token expired!');
//        localStorage.clear();
//        window.location.replace('/login');
//      } else if (error?.response?.status === 401 && !originalRequest._retry) {
//        console.log('Inside else if');
//        originalRequest._retry = true;
//        const accessToken = await refreshAccessToken();
//        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
//        return axiosInstance(originalRequest); 
//      } else {
//        console.log('before throw')
//        throw error;
//      }
//    }
//  );

//  const refreshAccessToken = async () => {
//    const authTokens = JSON.parse(localStorage.getItem('authTokens') || '{}');
//    const refreshToken = authTokens.refreshToken;
//    const data = { refreshToken: refreshToken };
//    try {
//      const response = await axios.post(`${apiEndpoint}api/token/refresh/`, data); 
//      console.log(response);
//      const accessToken = response?.data?.data?.accessToken;
//      let updatedAuthTokens ={
//        accessToken: accessToken,
//        refreshToken: refreshToken,
//      };
//      localStorage.setItem('authTokens', JSON.stringify(updatedAuthTokens));
//      return accessToken;
//    } catch (err) {
//      console.log('Error occurred in generating refresh token: ', err);
//      localStorage.clear();
//   }
//  };

const axiosPrivate = axiosInstance;

export {axiosPrivate};
