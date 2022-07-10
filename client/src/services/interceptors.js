import axios from "axios";

//TODO: best practice ?
const authHeaderInterceptor = axios.interceptors.request.use((req) => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  if (userToken) {
    req.headers.authorization = `Bearer ${userToken?.token}`;
  }
  return req;
});

export default authHeaderInterceptor;
