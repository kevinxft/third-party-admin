import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const importResource = (name) => () => import(`/@/views/resource/allInOne/${name}.vue`);

const permission: AppRouteModule = {
  path: '/allInOne',
  name: 'AllInOne',
  component: LAYOUT,
  redirect: '/allInOne/word',
  meta: {
    orderNo: 2000,
    icon: 'ion:menu-outline',
    title: 'All In One',
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
        title: '词典',
      },
    },
    {
      path: 'user',
      name: 'WeixinUser',
      component: importResource('WeixinUser'),
      meta: {
        title: '微信用户',
      },
    },
  ],
};

export default permission;
