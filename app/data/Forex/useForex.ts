import {apiClient} from '../../httpClient/HttpClient';
import URL from '../../httpClient/URL';

const getRate = async () => {
  const res = await apiClient.getJson(`${URL.forex}`);
  return res;
};

export default {
  getRate,
};
