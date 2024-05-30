import React, { useState, useEffect } from "react";
import "../css/InfiniteCarousel.css";

const InfiniteCarousel = ({ children, autoPlaySpeed = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % (length * 2));
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [currentIndex, length, autoPlaySpeed]);

  return (
    <div className="infinite-carousel">
      <div
        className="infinite-carousel-inner"
        style={{
          transform: `translateX(-${
            (currentIndex % length) * (100 / length)
          }%)`,
        }}
      >
        {children.concat(children).map((child, index) => (
          <div className="infinite-carousel-item" key={index}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
