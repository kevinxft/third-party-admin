import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const importResource = (name) => () => import(`/@/views/resource/third-party-server/${name}.vue`);

const permission: AppRouteModule = {
  path: '/third-party',
  name: 'ThirdParty',
  component: LAYOUT,
  redirect: '/third-party/word',
  meta: {
    orderNo: 2000,
    icon: 'ion:menu-outline',
    title: '第三方服务',
  },
  children: [
    {
      path: 'word',
      name: 'Word',
      component: importResource('Word'),
      meta: {
        title: '单词',
      },
    },
    {
      path: 'dictionary',
      name: 'Dictionary',
      component: importResource('Dictionary'),
      meta: {
        title: '字典',
      },
    },
    {
      path: 'user',
      name: 'ThirdPartyUser',
      component: importResource('User'),
      meta: {
        title: '用户',
      },
    },
  ],
};

export default permission;
