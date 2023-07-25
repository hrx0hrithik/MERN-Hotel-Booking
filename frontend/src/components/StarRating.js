import React from "react";

const StarRating = ({ rating }) => {
  const parsedRating = parseFloat(rating);

  if (isNaN(parsedRating) || parsedRating < 0) {
    return null;
  }

  const fullStars = Math.floor(parsedRating);
  const hasHalfStar = parsedRating - fullStars >= 0.5;
  const fullStarsArray = new Array(fullStars).fill(null);

  return (
    <div className="star-rating">
      {fullStarsArray.map((_, index) => (
        <i key={index} className="bi bi-star-fill"></i>
      ))}
      {hasHalfStar && <i className="bi bi-star-half"></i>}
    </div>
  );
};

export default StarRating;
