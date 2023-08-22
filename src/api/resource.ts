import { defHttp } from '../utils/http/axios';

const resourceRequest = (database: string, name: string, query = {}, method = 'get') => {
  let str = Object.keys(query).reduce((acc, cur) => {
    acc += `&${cur}=${query[cur]}`;
    return acc;
  }, '');

  str = str.slice(1);
  let url = `/resource/${database}/${name}`;
  if (str) {
    url = `${url}?${str}`;
  }
  console.log(url);

  return defHttp[method]({ url }, { isTransformResponse: false });
};

export const getList = (database, name, query = {}) =>
  resourceRequest(database, name, query, 'get');

export const updateDict = (data: { dictId: string; name: string }) =>
  defHttp.put({ url: '/dict/update', data }, { isTransformResponse: false });

export const addDict = (data: { dictId: string; name: string }) =>
  defHttp.post(
    {
      url: '/dict/add',
      data,
    },
    {
      isTransformResponse: false,
    },
  );

export const uploadDict = (data: FormData) =>
  defHttp.post(
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
      url: '/dict/upload',
      data,
    },
    { isTransformResponse: false },
  );
