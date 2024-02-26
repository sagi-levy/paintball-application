import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_RENDER_API_URL; 
export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}
export const httpRequestDetails = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  put: axios.put,
};
export default httpRequestDetails;
