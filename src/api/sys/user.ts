import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi() {
  const fakeUserInfo = {
    userId: '1',
    username: 'vben',
    realName: 'Vben Admin',
    desc: 'manager',
    password: '123456',
    token: 'fakeToken1',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super',
      },
    ],
  };
  return Promise.resolve(fakeUserInfo);
  // return defHttp.post<LoginResultModel>(
  //   {
  //     url: Api.Login,
  //     params,
  //   },
  //   {
  //     errorMessageMode: mode,
  //   },
  // );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return '';
  // return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
