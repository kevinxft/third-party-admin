import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

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
      path: 'admin',
      name: 'Admin',
      component: () => import(`/@/views/resource/allInOne/Admin.vue`),
      meta: {
        title: '管理员',
      },
    },
    {
      path: 'word',
      name: 'Word',
      component: () => import(`/@/views/resource/allInOne/Word.vue`),
      meta: {
        title: '单词',
      },
    },
    {
      path: 'dictionary',
      name: 'Dictionary',
      component: () => import(`/@/views/resource/allInOne/Dictionary.vue`),
      meta: {
        title: '词典',
      },
    },
    {
      path: 'user',
      name: 'WeixinUser',
      component: () => import(`/@/views/resource/allInOne/WeixinUser.vue`),
      meta: {
        title: '微信用户',
      },
    },
  ],
};

export default permission;
