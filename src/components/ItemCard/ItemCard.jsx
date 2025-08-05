import "./ItemCard.css";
import likeIcon from "../../assets/likebutton.svg";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext"; // import context

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = Boolean(currentUser?._id);

  const isLiked = isLoggedIn && item.likes.includes(currentUser._id);
  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleLike = () => {
    if (!isLoggedIn) return;
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
      />
      {isLoggedIn && (
        <button
          className={likeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label="Like button"
        >
          <img
            src={likeIcon}
            alt={isLiked ? "Unlike" : "Like"}
            className="card__like-icon"
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
