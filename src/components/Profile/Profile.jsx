import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button
          className="profile__edit-button"
          onClick={onEditProfile}
          type="button"
        >
          Change profile data
        </button>
        <button
          className="profile__logout-button"
          onClick={onSignOut}
          type="button"
        >
          Log out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
