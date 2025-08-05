import "./Header.css";
import logo from "../../assets/headerlogo.svg";
import avatar from "../../assets/useravatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  isModalOpen,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    } else if (currentUser?.name) {
      return (
        <div className="header__avatar-placeholder">
          {currentUser.name[0].toUpperCase()}
        </div>
      );
    } else {
      return (
        <img
          src={avatar}
          alt="Default user avatar"
          className="header__avatar"
        />
      );
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__toggle-and-button">
        {!isModalOpen && <ToggleSwitch />}

        {isLoggedIn ? (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        ) : (
          <>
            <button
              type="button"
              className="header__register-btn"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-btn"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </div>

      {isLoggedIn && currentUser && (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>

            {renderUserAvatar()}
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
