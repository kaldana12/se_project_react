import "./ConfirmModal.css";
import close from "../../assets/close.png";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure?",
}) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <p className="modal__message">{message}</p>
        <div className="modal__buttons">
          <button className="modal__button_confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__button_cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
        <button type="button" onClick={onClose} className="modal__close">
          <img src={close} alt="close button" className="modal__close-button" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
