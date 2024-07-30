// src/StarRating.tsx
import React, { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  allowUpdate?: boolean;
  rating?:number; 
  setRating?:React.Dispatch<React.SetStateAction<number>>;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  allowUpdate = true,
  rating = 0,
  setRating  = () => {},
  
}) => {
  // const [rating, setRating] = useState<number>(0);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
  };

  

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={ratingValue}
              className={`cursor-pointer text-4xl ${
                ratingValue <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => {
                if (allowUpdate) {
                  handleClick(ratingValue);
                }
              }}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
