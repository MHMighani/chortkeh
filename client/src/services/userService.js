import axios from "axios";
import { serverUrl } from "../config.json";

export async function signupUser(signupInfo) {
  try {
    return await axios.post(`${serverUrl}/register`, signupInfo);
  } catch (error) {
    return error.response;
  }
}

export async function loginUser(loginInfo) {
  try {
    return await axios.post(`${serverUrl}/login`, loginInfo);
  } catch (error) {
    return error.response;
  }
}
