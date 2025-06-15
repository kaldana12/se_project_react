import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <h2 className="modal__tile">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="" className="modal__close-button" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
