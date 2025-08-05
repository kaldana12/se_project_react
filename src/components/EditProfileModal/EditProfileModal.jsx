import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Change profile data"
      buttonText="Save changes"
    >
      <label className="modal__label">
        <span className="modal__label-text">
          Name<span className="required-asterisk">*</span>
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="modal__input"
        />
      </label>
      <label className="modal__label">
        <span className="modal__label-text">
          Avatar<span className="required-asterisk">*</span>
        </span>
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
          className="modal__input"
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
