import "./ItemModal.css";
import close from "../../assets/close.png";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  if (!isOpen || !card || !card.link) return null;

  console.log("Modal card:", card);

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
          <button className="modal__delete" onClick={() => onDelete(card)}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
