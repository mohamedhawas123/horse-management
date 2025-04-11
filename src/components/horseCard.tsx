import { useState } from "react";
import placeHolder from "../assets/holderplace.jpeg";
import { useNavigate } from "react-router-dom";

interface HorseCardProps {
  id: string;
  name: string;
  age: { years: number; months: number };
  breed: string;
  imageUrl: string;
}

const HorseCard = ({ id, name, age, breed, imageUrl }: HorseCardProps) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/horses/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 hover:shadow-lg transition-colors duration-300 cursor-pointer rounded-lg shadow p-4"
    >
      <img
        src={imgSrc}
        alt={name}
        onError={() => setImgSrc(placeHolder)}
        className="w-full h-48 object-cover rounded"
      />
      <div className="mt-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{breed}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {age.years} {age.years === 1 ? "year" : "years"}{" "}
          {age.months > 0 &&
            `& ${age.months} ${age.months === 1 ? "month" : "months"}`}
        </p>
      </div>
    </div>
  );
};

export { HorseCard };
