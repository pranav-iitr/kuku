import React from 'react';

interface ReviewItemProps {
  profilePic: string;
  reviewerName: string;
  reviewContent: string;
  rating: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ profilePic, reviewerName, reviewContent, rating }) => {
  return (
    <div className="flex gap-6 items-start">
      <img src={profilePic} alt={reviewerName} className="w-15 h-15 rounded-full" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img src={`/assets/star-fill.svg`} alt="Star" className="w-6 h-6" />
          <span className="font-inter font-bold text-md text-gray-800">{rating.toFixed(1)}</span>
        </div>
        <h2 className="font-inter font-bold text-md text-gray-800">{reviewerName}</h2>
        <p className="font-poppins max-w-[450px] text-wrap text-base text-gray-800 leading-7">{reviewContent}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
