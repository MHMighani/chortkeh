import { useState, useRef } from "react";
import { ReactComponent as UserAvatar } from "./user-avatar.svg";
import DarkModeToggleBtn from "../darkModeToggleBtn";
import useAuth from "../../../hooks/useAuth";
import "./menu.scss";

function Menu() {
  const { logoutUser } = useAuth();
  const [menuActive, setMenuActive] = useState(false);
  const usermenuRef = useRef();

  function handler(e) {
    if (!usermenuRef.current?.contains(e.target) && menuActive) {
      setMenuActive(false);
    }
  }
  document.addEventListener("mousedown", handler);

  return (
    <div className={`usermenu ${menuActive ? "active" : ""}`} ref={usermenuRef}>
      <button
        className="usermenu__button"
        onClick={() => setMenuActive(!menuActive)}
      >
        <UserAvatar />
      </button>
      <div className="usermenu__body">
        <div className="menu-item">مشخصات</div>
        <div className="menu-item">پروفایل</div>
        {/* <div className="menu__item">تنظیمات</div> */}
        <div className="menu-item">
          <DarkModeToggleBtn />
        </div>
        <div className="menu-item" onClick={() => logoutUser()}>
          خروج
        </div>
      </div>
    </div>
  );
}

export default Menu;
