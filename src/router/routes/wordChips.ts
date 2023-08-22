import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const importResource = (name) => () => import(`/@/views/resource/wordChips/${name}.vue`);

const permission: AppRouteModule = {
  path: '/wordChips',
  name: 'WordChips',
  component: LAYOUT,
  redirect: '/wordChips/word',
  meta: {
    orderNo: 1000,
    icon: 'ion:menu-outline',
    title: '单词碎片',
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: importResource('User'),
      meta: {
        title: '用户',
      },
    },
    {
      path: 'userWord',
      name: 'UserWord',
      component: importResource('UserWord'),
      meta: {
        title: '用户单词',
      },
    },
    {
      path: 'userBook',
      name: 'UserBook',
      component: importResource('UserBook'),
      meta: {
        title: '用户单词本',
      },
    },
  ],
};

export default permission;
