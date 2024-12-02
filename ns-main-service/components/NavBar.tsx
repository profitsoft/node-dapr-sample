import { Image } from '@mantine/core';

import logo from '@/publick/logo.png';
import Link from 'next/link';
import classes from '@/components/NavBar.module.css';

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
      label: 'Contracts',
      link: '/contract',
    },
    {
      label: 'Clients',
      link: '/clients',
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
};

const NavBar = () => {
  const menuItems = getMenuItems();
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <Link href={'/'}>
          <Image alt={'logo'} className={classes.logoImage} src={logo.src} />
        </Link>
      </div>
      <div className={classes.menuItemsContainer}>
        {menuItems.length &&
          menuItems.map((item) => (
            <Link
              className={classes.menuItem}
              href={item.link}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
