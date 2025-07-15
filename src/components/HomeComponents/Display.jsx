import React, { useEffect, useRef } from "react";
import display1 from "../../assets/images/mcgg.jpg";
import display2 from "../../assets/images/display2.jpg"
import display3 from "../../assets/images/display3.jpg"
import { useUser } from "../../context/UserContext";

const Display = () => {
  const disList = [display1, display2, display3];
  const { isDarkMode } = useUser();
  const containerRef = useRef(null);

  // Auto scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollIndex = 0;
    const maxIndex = disList.length;

    const interval = setInterval(() => {
      scrollIndex = (scrollIndex + 1) % maxIndex;

      // Calculate scrollLeft value:
      // Scroll width per item depends on viewport width, 
      // so calculate using element width
      const childWidth = container.children[0].offsetWidth;
      container.scrollTo({
        left: scrollIndex * childWidth,
        behavior: "smooth",
      });
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [disList.length]);

  return (
   <div
  className={`mt-10 sm:mt-0 shadow-md border rounded-xl overflow-hidden ${
    isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"
  }`}
>
  <div
    ref={containerRef}
    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
    style={{ scrollSnapType: "x mandatory" }}
  >
    {disList.map((item, i) => (
      <div
        key={i}
        className="flex-shrink-0 w-full snap-center"
        style={{ scrollSnapAlign: "center" }}
      >
        <img
          src={item}
          alt={`slide-${i}`}
          className="w-full h-50 sm:h-70 lg:h-100 object-cover"
        />
      </div>
    ))}
  </div>
</div>

  );
};

export default Display;
