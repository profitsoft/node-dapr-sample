const getMenuItems = (): NavLink[] => {
  return [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'Tenants',
      link: '/tenant',
    },
    {
      label: 'About',
      link: '/about',
    },
    {
      label: 'Login',
      link: '/login',
    },
  ];
}

export default getMenuItems;