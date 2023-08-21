import { defHttp } from '../utils/http/axios';

const resourceRequest = (name, query = {}, method = 'get') => {
  let str = Object.keys(query).reduce((acc, cur) => {
    acc += `&${cur}=${query[cur]}`;
    return acc;
  }, '');

  str = str.slice(1);
  let url = `/resource/${name}`;
  if (str) {
    url = `${url}?${str}`;
  }
  console.log(url);

  return defHttp[method]({ url }, { isTransformResponse: false });
};

export const getList = (name, query = {}) => resourceRequest(name, query, 'get');
