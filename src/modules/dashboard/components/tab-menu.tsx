import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Tab } from '../redux/dashboard-reducer';

import './tab-menu.scss';

export interface TabMenuProps {
  onDelete: (tab: Tab) => void;
  onEdit: (tab: Tab) => void;
  tab: Tab;
}

export const TabMenu: React.FC<TabMenuProps> = ({
  tab,
  onEdit,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Dropdown className="tab-menu" isOpen={menuVisible} toggle={() => setMenuVisible(!menuVisible)}>
      <DropdownToggle tag="span" caret>
        {' '}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() => {
            onEdit(tab);
            setMenuVisible(false);
          }}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            onDelete(tab);
            setMenuVisible(false);
          }}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
