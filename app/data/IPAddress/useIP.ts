import {apiClient} from '../../httpClient/HttpClient';
import URL from '../../httpClient/URL';
const getInfo = async () => {
  const response = await apiClient.getJson(`${URL.ip}`);
  return response;
};
export default {
  getInfo
}