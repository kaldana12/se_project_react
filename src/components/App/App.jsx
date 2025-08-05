import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";

import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatheApi";
import { defaultClothingItems as defaultItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit.js";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import {
  addItem,
  getItems,
  deleteItem,
  getUserInfo,
  addCardLike,
  removeCardLike,
  signup,
  signin,
  updateUserProfile,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../context/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const normalizedDefaultItems = defaultItems.map((item) => ({
  ...item,
  link: item.link || item.imageUrl,
}));

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [clothingItems, setClothingItems] = useState(normalizedDefaultItems);
  const [weatherType, setWeatherType] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    const token = localStorage.getItem("jwt");

    addItem({ name, imageUrl, weather: weatherType }, token)
      .then((newItem) => {
        const normalizedItem = {
          ...newItem,
          imageUrl: newItem.imageUrl || newItem.link, // display fallback
        };

        setClothingItems([normalizedItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
      });
  };

  const handleCardDelete = (cardToDelete) => {
    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Clicked card:", JSON.stringify(card, null, 2));
        const normalizedData = data.map((item) => ({
          ...item,
          link: item.link || item.imageUrl,
        }));
        setClothingItems(normalizedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      getUserInfo(token)
        .then((userData) => {
          console.log("Token is valid. User data:", userData);
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Invalid token:", err);
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleRegisterSubmit = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        return signin({ email, password });
      })
      .then((data) => {
        console.log("User signed in!", data);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration/Login failed:", err);
      });
  };
  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  const handleLoginSubmit = ({ email, password }) => {
    signin({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        closeActiveModal();
        console.log("User logged in!");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };
  const handleSwitchToRegister = () => {
    setActiveModal("register");
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    const isLiked = likes.some((user) => user === currentUser._id);

    const likeAction = !isLiked ? addCardLike : removeCardLike;

    likeAction(_id, token)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => {
        console.error("Like error:", err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
              isModalOpen={!!activeModal}
            ></Header>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegisterSubmit}
            onSwitchToLogin={handleSwitchToLogin}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLoginSubmit}
            onSwitchToRegister={handleSwitchToRegister}
          />

          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            onUpdateUser={handleUpdateUser}
          />

          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
