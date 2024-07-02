import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import Search from "./Search";
import Dropdown from "./DropdownMenu";
import { useCart } from "../contexts/CartContext";

const MenuItems3 = [
  {
    title: "Explore",
    path: "/homepage",
    cName: "dropdown-link",
  },
  {
    title: "<hr/>",
    path: "/homepage",
    cName: "dropdown-link",
  },
  {
    title: "Courses",
    path: "/courses",
    cName: "dropdown-link",
  },
  {
    title: "my courses",
    path: "/inprogress",
    cName: "dropdown-link",
  },
];

function PageNav() {
  const { logout, isAuthenticated } = useAuth();
  const [dropdownVisible3, setDropdownVisible3] = useState(false);
  const [dropdownVisible4, setDropdownVisible4] = useState(false);
  const navigateTo = useNavigate();
  const [svgSize, setSvgSize] = useState({ width: 31, height: 30 });
  const { itemsNumber } = useCart();

  // function handleLogout() {
  //   navigateTo("/");
  //   logout();
  // }
  useEffect(
    function () {
      if (!isAuthenticated) navigateTo("/", { replace: true });
    },
    [isAuthenticated, navigateTo]
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 4000) {
        setSvgSize({ width: 62, height: 60 }); // Double the size
      } else {
        setSvgSize({ width: 31, height: 30 }); // Original size
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // const MenuItems4 = [
  //   {
  //     title: "Profile",
  //     path: "/profile",
  //     cName: "dropdown-link",
  //   },
  //   {
  //     title: "logout",
  //     cName: "dropdown-link",
  //     onClick: handleLogout,
  //   },
  // ];

  const toggleDropdown3 = () => {
    setDropdownVisible3((prevDropdownVisible) => !prevDropdownVisible);
    setDropdownVisible4(false); // Close the other dropdown
  };
  const toggleDropdown4 = () => {
    setDropdownVisible4((prevDropdownVisible) => !prevDropdownVisible);
    setDropdownVisible3(false); // Close the other dropdown
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <Logo path="/homepage" />
      </div>
      <ul>
        <li className={styles.navItem} onClick={toggleDropdown3}>
          <Search />
          <div className={`dropdown-menu ${dropdownVisible3 ? "visible" : ""}`}>
            <Dropdown MenuItems={MenuItems3} />
          </div>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/homepage">Home</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/carsystem">Car System</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className="nav-links" to="/courses">
            Courses
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className="nav-links" to="/inprogress">
            My learning
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink to="/aboutus">About us</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/cart">
            <svg
              width={svgSize.width}
              height={svgSize.height}
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.75 22.5C22.413 22.5 23.0489 22.7634 23.5178 23.2322C23.9866 23.7011 24.25 24.337 24.25 25C24.25 25.663 23.9866 26.2989 23.5178 26.7678C23.0489 27.2366 22.413 27.5 21.75 27.5C21.087 27.5 20.4511 27.2366 19.9822 26.7678C19.5134 26.2989 19.25 25.663 19.25 25C19.25 23.6125 20.3625 22.5 21.75 22.5ZM1.75 2.5H5.8375L7.0125 5H25.5C25.8315 5 26.1495 5.1317 26.3839 5.36612C26.6183 5.60054 26.75 5.91848 26.75 6.25C26.75 6.4625 26.6875 6.675 26.6 6.875L22.125 14.9625C21.7 15.725 20.875 16.25 19.9375 16.25H10.625L9.5 18.2875L9.4625 18.4375C9.4625 18.5204 9.49542 18.5999 9.55403 18.6585C9.61263 18.7171 9.69212 18.75 9.775 18.75H24.25V21.25H9.25C8.58696 21.25 7.95107 20.9866 7.48223 20.5178C7.01339 20.0489 6.75 19.413 6.75 18.75C6.75 18.3125 6.8625 17.9 7.05 17.55L8.75 14.4875L4.25 5H1.75V2.5ZM9.25 22.5C9.91304 22.5 10.5489 22.7634 11.0178 23.2322C11.4866 23.7011 11.75 24.337 11.75 25C11.75 25.663 11.4866 26.2989 11.0178 26.7678C10.5489 27.2366 9.91304 27.5 9.25 27.5C8.58696 27.5 7.95107 27.2366 7.48223 26.7678C7.01339 26.2989 6.75 25.663 6.75 25C6.75 23.6125 7.8625 22.5 9.25 22.5ZM20.5 13.75L23.975 7.5H8.175L11.125 13.75H20.5Z"
                fill="#442C8F"
              />
            </svg>
            <span>{itemsNumber}</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/likes">
            <svg
              width={svgSize.width}
              height={svgSize.height}
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.65 25.4223L15.5 25.5858L15.335 25.4223C8.21 18.376 3.5 13.7166 3.5 8.99183C3.5 5.72207 5.75 3.26975 8.75 3.26975C11.06 3.26975 13.31 4.90463 14.105 7.12807H16.895C17.69 4.90463 19.94 3.26975 22.25 3.26975C25.25 3.26975 27.5 5.72207 27.5 8.99183C27.5 13.7166 22.79 18.376 15.65 25.4223ZM22.25 0C19.64 0 17.135 1.32425 15.5 3.40054C13.865 1.32425 11.36 0 8.75 0C4.13 0 0.5 3.94005 0.5 8.99183C0.5 15.1553 5.6 20.2071 13.325 27.842L15.5 30L17.675 27.842C25.4 20.2071 30.5 15.1553 30.5 8.99183C30.5 3.94005 26.87 0 22.25 0Z"
                fill="#442C8F"
              />
            </svg>
          </NavLink>
        </li>
        <li className={styles.navItem} onClick={toggleDropdown4}>
          <NavLink to="/profile" className="nav-links">
            <svg
              width={svgSize.width}
              height={svgSize.height}
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5 11.25C20.5 12.5761 19.9732 13.8479 19.0355 14.7855C18.0979 15.7232 16.8261 16.25 15.5 16.25C14.1739 16.25 12.9021 15.7232 11.9645 14.7855C11.0268 13.8479 10.5 12.5761 10.5 11.25C10.5 9.92392 11.0268 8.65215 11.9645 7.71447C12.9021 6.77678 14.1739 6.25 15.5 6.25C16.8261 6.25 18.0979 6.77678 19.0355 7.71447C19.9732 8.65215 20.5 9.92392 20.5 11.25ZM18 11.25C18 11.913 17.7366 12.5489 17.2678 13.0178C16.7989 13.4866 16.163 13.75 15.5 13.75C14.837 13.75 14.2011 13.4866 13.7322 13.0178C13.2634 12.5489 13 11.913 13 11.25C13 10.587 13.2634 9.95107 13.7322 9.48223C14.2011 9.01339 14.837 8.75 15.5 8.75C16.163 8.75 16.7989 9.01339 17.2678 9.48223C17.7366 9.95107 18 10.587 18 11.25Z"
                fill="#442C8F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5 1.25C7.90625 1.25 1.75 7.40625 1.75 15C1.75 22.5938 7.90625 28.75 15.5 28.75C23.0938 28.75 29.25 22.5938 29.25 15C29.25 7.40625 23.0938 1.25 15.5 1.25ZM4.25 15C4.25 17.6125 5.14125 20.0175 6.635 21.9275C7.68404 20.5499 9.03737 19.4334 10.5893 18.6654C12.1412 17.8973 13.8497 17.4985 15.5812 17.5C17.2904 17.4984 18.9774 17.8869 20.5137 18.636C22.0499 19.385 23.395 20.4749 24.4462 21.8225C25.5293 20.402 26.2585 18.744 26.5736 16.9857C26.8887 15.2275 26.7805 13.4194 26.2581 11.7112C25.7357 10.003 24.814 8.44381 23.5694 7.16255C22.3247 5.88128 20.7928 4.91482 19.1005 4.34314C17.4081 3.77145 15.604 3.61096 13.8373 3.87497C12.0707 4.13897 10.3922 4.81986 8.94096 5.86132C7.48968 6.90277 6.30726 8.27484 5.49154 9.86399C4.67581 11.4532 4.25023 13.2137 4.25 15ZM15.5 26.25C12.9174 26.2539 10.4128 25.3654 8.41 23.735C9.21616 22.5809 10.2892 21.6386 11.5377 20.9884C12.7863 20.3381 14.1735 19.999 15.5812 20C16.9715 19.9989 18.3419 20.3295 19.5787 20.9643C20.8155 21.5991 21.883 22.5198 22.6925 23.65C20.6741 25.3334 18.1282 26.2537 15.5 26.25Z"
                fill="#442C8F"
              />
            </svg>
          </NavLink>
          <div
            className={`dropdown-menu ${
              dropdownVisible4 ? "visible profile-drop" : ""
            }`}
          >
            {/* <Dropdown MenuItems={MenuItems4} /> */}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
