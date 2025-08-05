import "./ItemModal.css";
import close from "../../assets/close.png";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  if (!isOpen || !card || !card.link) return null;

  console.log("card.owner:", card?.owner);
  console.log("currentUser._id:", currentUser?._id);

  // Use optional chaining just in case
  const isOwn =
    card.owner?._id === currentUser?._id || card.owner === currentUser?._id;

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" className="modal__close-button" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button className="modal__delete" onClick={() => onDelete(card)}>
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
