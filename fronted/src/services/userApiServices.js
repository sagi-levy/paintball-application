import httpRequestDetails, { setCommonHeader } from "./basicIrlAxios";
import jwtDecode from "jwt-decode";
const TOKEN_KEY = process.env.REACT_APP_TOKEN;
setTokenHeader();
function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokenHeader() {
  setCommonHeader("x-auth-token", getJwt());
}
export const createUser = function (user) {
  return httpRequestDetails.post("/users", user);
};
export const logINUser = async function (credentials) {
  const { data } = await httpRequestDetails.post("/auth", credentials);
  localStorage.setItem(TOKEN_KEY, data.token);
  setTokenHeader();
};
export function logOut() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}
export function getUser() {
  try {
    const token = getJwt();
    console.log("token:   ", token);
    return jwtDecode(token);
  } catch {
    return null;
  }
}
export const changeUserPassword = function (id, password) {
  return httpRequestDetails.put(`/users/change-password/${id}`, password);
};

const userServices = {
  createUser,
  logINUser,
  logOut,
  getJwt,
  changeUserPassword,
};
export default userServices;
