// import React from 'react';
import { getUserProfile } from '../../commons/Utility';
import { menu } from './data';
import MenuItem from './MenuItem';



const Menu = () => {
  const getRole = (): string => {
    const userProfile = getUserProfile();
    return userProfile ? userProfile.role : '';
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            catalog={item.catalog}
             listItems={parseInt(getRole()) > 0 ? item.listItemsAdmin:item.listItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
