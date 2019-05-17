import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import './edit-delete-menu.scss';

interface MenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const EditDeleteMenu: React.FC<MenuProps> = ({
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
            onEdit();
            setMenuVisible(false);
          }}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            onDelete();
            setMenuVisible(false);
          }}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
