import React, { useState, useEffect, useRef } from "react";
import "../css/InfiniteCarousel.css";

const InfiniteCarousel = ({ children, autoPlaySpeed = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;
  const carouselRef = useRef(null);
  const isTransitioning = useRef(false);

  const clonedChildren = [...children, ...children];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [autoPlaySpeed]);

  useEffect(() => {
    if (isTransitioning.current) return;

    if (currentIndex >= length) {
      setTimeout(() => {
        isTransitioning.current = true;
        setCurrentIndex(currentIndex - length);
        setTimeout(() => {
          isTransitioning.current = false;
        }, 50);
      }, 500);
    }
  }, [currentIndex, length]);

  return (
    <div className="infinite-carousel" ref={carouselRef}>
      <div
        className="infinite-carousel-inner"
        style={{
          transform: `translateX(-${(currentIndex * 100) / length}%)`,
          transition: isTransitioning.current ? "none" : "transform 0.5s ease",
          width: `${clonedChildren.length * 15}%`,
        }}
      >
        {clonedChildren.map((child, index) => (
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
