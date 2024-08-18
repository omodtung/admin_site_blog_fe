import axios from "axios";
export default function requestApi(
  endpoint,
  method,
  body = [],
  responseType = "json",
  contentType = 'application/json'
) {
  const headers = {
    "Accept": "application/json",
    "Content-Type": contentType,
    "Access-Control-Allow-Origin": "*",

  };
  const instance = axios.create({ headers });

  // gui Reqest len NestJS
  //khi luc moi vo thi dung lau access_token nay de vo

  //
  //   // In summary, this code intercepts outgoing requests and adds an "Authorization" header to the request if a valid access token exists in local storage. If an error occurs during the request, it rejects the promise with that error.

  //
  instance.interceptors.request.use(
    (config) => {
      //  token này được láy ra cho mục đích Authetication
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const originalConfig = error.config;
      console.log("Access token Expired");
      if (error.response && error.response.status === 419) {
        //khi token het han
        try {
          console.log("call refresh token api");
          // goi len endpoint fresh_token
          const result = await instance.post(
            `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
            {
              // lay token tu local storge luu tu truoc
              refresh_token: localStorage.getItem("refresh_token"),
            }
          );

          const { access_token, refresh_token } = result.data;
          //set AccessToken va Refresh TOken moi vao local- storage
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          originalConfig.headers["Authorization"] = `Bearer ${access_token}`;
          return instance(originalConfig);
        } catch (err) {
          // xay ra loi thi bo xoa token  roi bo luon
          if (err.response && err.response.status === 400) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
          }
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance.request({
    method: method,
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    data: body,
    responseType: responseType,
  });
}
