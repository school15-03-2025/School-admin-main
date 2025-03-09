// components/Rating.tsx
import React from 'react';

type RatingProps = {
  rating: number;
  maxStars?: number;
};

const Rating: React.FC<RatingProps> = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxStars }, (_, i) => {
        const starClass = i + 1 <= Math.floor(rating)
          ? 'text-yellow-400'
          : i < rating
          ? 'text-yellow-300' // partial star color
          : 'text-gray-300';

        return (
          <svg
            key={i}
            className={`w-4 h-4 ${starClass}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M12 2.25l2.705 7.294h7.752l-6.267 4.91 2.405 7.294-6.595-4.794-6.595 4.794 2.405-7.294L1.543 9.544h7.752L12 2.25z" />
          </svg>
        );
      })}
      <span className="ml-2 text-gray-700 text-xs">({rating.toFixed(1)})</span>
    </div>
  );
};

export default Rating;
