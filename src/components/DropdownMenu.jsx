// DropdownMenu.js
import React from "react";
import { Link } from "react-router-dom";
function Dropdown({ MenuItems }) {
  return (
    <ul className="dropdown-menu">
      {MenuItems.map((item, index) => (
        <li key={index}>
          {item.title === "<hr/>" ? (
            <hr style={{ width: '150px', margin: '0',padding:'0' }} />
          ) : (
            <Link className={item.cName} to={item.path} onClick={item.onClick}>
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
