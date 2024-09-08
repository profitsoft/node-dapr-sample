import { Image } from '@mantine/core';

import logo from '@/publick/logo.png';
import Link from 'next/link';
import getMenuItems from '@/actions/getMenuItems';

const NavBar = () => {
  const menuItems = getMenuItems();
  return (
    <div className='fixed w-full flex flex-row justify-between bg-[#E3EBFD]'>
      <div className='pl-2 pt-1'>
        <Link href={'/'}>
          <Image src={logo.src} h={'4em'} width={'auto'} alt={'logo'}/>
        </Link>
      </div>
      <div className='flex flex-row gap-4 pt-6 pr-6'>
        {menuItems.length && menuItems.map(item => (
          <Link className='text-[#434D5C] font-bold hover:text-blue-500' href={item.link} key={item.label}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;