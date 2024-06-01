import React, { useState, useEffect, useRef } from "react";
import "../css/InfiniteCarousel.css";

const InfiniteCarousel = ({ children, autoPlaySpeed = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [autoPlaySpeed]);

  useEffect(() => {
    if (currentIndex >= length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, length]);

  return (
    <div className="infinite-carousel" ref={carouselRef}>
      <div
        className="infinite-carousel-inner"
        style={{
          transform: `translateX(-${(currentIndex * 100) / length}%)`,
          transition: "transform 0.5s ease",
          width: `${length * 50}%`,
        }}
      >
        {children.concat(children).map((child, index) => (
          <div
            className="infinite-carousel-item"
            key={index}
            style={{ width: `calc(100% / ${length})` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
