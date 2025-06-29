import avatar from "../../assets/useravatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Deafult Avatar" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default SideBar;
