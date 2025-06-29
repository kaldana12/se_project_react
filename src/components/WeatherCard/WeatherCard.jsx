import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit.js";

const WeatherCard = ({ weatherData }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <div className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </div>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
};
export default WeatherCard;
