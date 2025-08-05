import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  onSwitchToRegister,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <ModalWithForm
      buttonText="Sign Up"
      title=" Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="login-email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <div className="modal__button-wrapper">
        <button
          type="submit"
          className="modal__submit-button"
          disabled={
            !((values.email || "").trim() && (values.password || "").trim())
          }
        >
          Log In
        </button>
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}
