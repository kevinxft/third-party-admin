import { defHttp } from '../utils/http/axios';

const reqList = (database: string, name: string, query = {}) => {
  let str = Object.keys(query).reduce((acc, cur) => {
    acc += `&${cur}=${query[cur]}`;
    return acc;
  }, '');

  str = str.slice(1);
  let url = `/resource/${database}/${name}`;
  if (str) {
    url = `${url}?${str}`;
  }
  return defHttp.get({ url });
};

const req = (database: string, name: string, id: string | number, method = 'get', data = {}) => {
  let url = `/resource/${database}/${name}`;
  if (id) {
    url += `/${id}`;
  }

  return defHttp[method]({
    url,
    data,
  });
};

export const getList = (database, name, query = {}) => reqList(database, name, query);

export const deleteOne = (database, name, id) => req(database, name, id, 'delete');

export const getOne = (database, name, id) => req(database, name, id);

export const updateOne = (database, name, id, data) => req(database, name, id, 'patch', data);

export const createOne = (database, name, data) => req(database, name, '', 'post', data);

// dict
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
