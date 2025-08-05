import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weatherType: "hot",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weatherType: "hot" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.imageUrl,
      weatherType: values.weatherType,
    });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="clothing-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id={type}
              name="weatherType"
              value={type}
              checked={values.weatherType === type}
              onChange={handleChange}
            />
            {type[0].toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
      <div className="modal__button-wrapper">
        <button
          type="submit"
          className="modal__submit-button"
          disabled={
            !((values.name || "").trim() && (values.imageUrl || "").trim())
          }
        >
          Add garment
        </button>
      </div>
    </ModalWithForm>
  );
}
