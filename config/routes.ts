export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    name: '项目管理',
    icon: 'project',
    path: '/project',
    component: './project',
  },
  {
    name: '操作日志',
    icon: 'log',
    path: '/optLog',
    component: './optLog',
  },
  {
    path: '/',
    redirect: '/project',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
