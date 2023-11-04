
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
    name: 'project',
    icon: 'project',
    path: '/project',
    component: './project',
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
