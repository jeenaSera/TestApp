import {apiClient} from '../../httpClient/HttpClient';
import URL from '../../httpClient/URL';

const getRate = async () => {
  const res = await apiClient.getJson(`${URL.forex}`);
  console.log(res, 'res');
  return res;
};

export default {
  getRate,
};
