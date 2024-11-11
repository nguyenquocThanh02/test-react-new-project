import { localStorageKey } from "@/constants";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_PATH_AUT,
  timeout: 5000,
  transformResponse: [
    function (data) {
      return data;
    },
  ],
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(localStorageKey.accessToken);
    if (token) {
      const expiry = Number(localStorage.getItem(localStorageKey.exp));
      const now = Math.floor(Date.now() / 1000);

      if (expiry - now < 1800) {
        // refresh và set lại token
        const newAccessToken = await refreshToken();
      }
      // ....
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      config.headers["ngrok-skip-browser-warning"] = "true";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshAttempts = 0;
let resultRefreshToken = null;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken =
          localStorage.getItem(localStorageKey.refreshtoken) || "";
        if (refreshToken && refreshAttempts <= 2) {
          const originalRequest = error.config;

          const dataRequest: dataRefresh = {
            refreshToken: refreshToken,
          };
          resultRefreshToken = !resultRefreshToken
            ? await AuthenApis.handleRefreshToken(dataRequest)
            : resultRefreshToken;
          if (resultRefreshToken?.data) {
            resultRefreshToken.data = JSON.parse(resultRefreshToken.data);
            localStorage.setItem(
              localStorageKey.accesstoken,
              resultRefreshToken.data.accessToken
            );
          }
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${localStorage.getItem(localStorageKey.accesstoken)}`;

          refreshAttempts++;
          return instance(originalRequest);
        } else {
          return <Login />;
        }
      } catch (err) {
        localStorage.removeItem(localStorageKey.accesstoken);
        localStorage.removeItem(localStorageKey.refreshtoken);
        localStorage.removeItem(localStorageKey.ownerId);
        localStorage.removeItem(localStorageKey.clinicId);
        return <Login />;
      }
    } else {
      return error.response;
    }
  }
);

export default instance;
