import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./RegisterModal.css";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  onSwitchToLogin,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatarUrl: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", avatarUrl: "", email: "", password: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      avatar: values.avatarUrl,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <ModalWithForm
      buttonText="Sign Up"
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        <span className="modal__label-text">
          Email<span className="required-asterisk">*</span>
        </span>
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        <span className="modal__label-text">
          Password<span className="required-asterisk">*</span>
        </span>
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="name" className="modal__label">
        <span className="modal__label-text">
          Name<span className="required-asterisk">*</span>
        </span>
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength="1"
          maxLength="30"
          required
        />
      </label>

      <label htmlFor="avatarUrl" className="modal__label">
        <span className="modal__label-text">
          Avatar URL<span className="required-asterisk">*</span>{" "}
        </span>
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
          required
        />
      </label>

      <div className="modal__button-wrapper">
        <button
          type="submit"
          className="modal__submit-button"
          disabled={
            !(
              (values.name || "").trim() &&
              (values.avatarUrl || "").trim() &&
              (values.email || "").trim() &&
              (values.password || "").trim()
            )
          }
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
