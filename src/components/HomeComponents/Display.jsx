import React, { useEffect, useRef, useState } from "react";
import display1 from "../../assets/images/mcgg.jpg";
import display2 from "../../assets/images/display2.jpg";
import display3 from "../../assets/images/display3.jpg";
import { useUser } from "../../context/UserContext";

const Display = () => {
  const disList = [display1, display2, display3];
  const { isDarkMode } = useUser();
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return; // pause auto scroll on hover/focus

    const container = containerRef.current;
    if (!container) return;

    let scrollIndex = 0;
    const maxIndex = disList.length;

    const interval = setInterval(() => {
      scrollIndex = (scrollIndex + 1) % maxIndex;

      const childWidth = container.children[0].offsetWidth;
      container.scrollTo({
        left: scrollIndex * childWidth,
        behavior: "smooth",
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [disList.length, isPaused]);

  return (
    <div
      className={`mt-10 sm:mt-0 shadow-md border rounded-xl overflow-hidden ${
        isDarkMode ? "bg-zinc-800 border-zinc-700" : "border-gray-100 bg-white"
      }`}
    >
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0} // make div focusable for keyboard interaction
      >
        {disList.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-52 sm:h-64 lg:h-80 snap-center"
            style={{ scrollSnapAlign: "center" }}
          >
            <img
              src={item}
              alt={`Display slide ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
