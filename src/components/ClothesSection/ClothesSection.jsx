import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({
  onCardClick,
  onCardLike,
  clothingItems,
  handleAddClick,
  openConfirmModal,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) =>
      item.owner === currentUser?._id || item.owner?._id === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__input">
        <p>Your items</p>
        <button
          className="clothes-section__button"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteClick={openConfirmModal}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
