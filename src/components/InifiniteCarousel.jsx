import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../css/InfiniteCarousel.css";

const InfiniteCarousel = ({
  children,
  autoPlaySpeed = 3000,
  visibleItems = 4,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = React.Children.toArray(children);
  const length = items.length;
  const carouselRef = useRef(null);
  const safeVisibleItems = Math.max(1, visibleItems);
  const maxIndex = Math.max(0, length - safeVisibleItems);

  useEffect(() => {
    if (length <= safeVisibleItems) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [autoPlaySpeed, length, maxIndex, safeVisibleItems]);

  return (
    <div className="infinite-carousel" ref={carouselRef}>
      <div
        className="infinite-carousel-inner"
        style={{
          transform: `translateX(-${currentIndex * (100 / safeVisibleItems)}%)`,
          transition: "transform 0.5s ease",
          width: `${(length * 100) / safeVisibleItems}%`,
        }}
      >
        {items.map((child, index) => (
          <div
            className="infinite-carousel-item"
            key={index}
            style={{ width: `${100 / length}%` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

InfiniteCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  autoPlaySpeed: PropTypes.number,
  visibleItems: PropTypes.number,
};

export default InfiniteCarousel;
