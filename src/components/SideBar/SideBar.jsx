import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import avatar from "../../assets/useravatar.svg";
import "./SideBar.css";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || avatar}
        alt={`${currentUser?.name || "Default"} Avatar`}
      />
      <p className="sidebar__username">{currentUser?.name || "Username"}</p>
    </div>
  );
}

export default SideBar;
