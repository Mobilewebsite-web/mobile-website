import { useNavigate } from "react-router-dom";
import ml from "../../assets/images/mlbb-logo.jpeg";
import React, { useRef, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const FloatingApps = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useUser();
  const scrollContainerRef = useRef(null);

  const floatingList = [
    { name: "Mobile Legends", path: "/recharge/mobile-legends", img: ml, tag: "Popular" },
    { name: "Game 2", path: "/recharge/game2", img: ml, tag: "New" },
    { name: "Game 3", path: "/recharge/game3", img: ml, tag: "New" },
  ];

  // Prevent body scroll when interacting with the slider
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  // Center the second card on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 366; // w-[366px] = 366px
      const gap = 16; // gap-x-4 = 16px
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const secondCardIndex = 1; // Second card
      const targetScroll = secondCardIndex * (cardWidth + gap) - (containerWidth - cardWidth) / 2; // Center the card
      scrollContainerRef.current.scrollLeft = targetScroll;
      console.log("Initial scroll:", { containerWidth, targetScroll, cardWidth });
    }
  }, []);

  // Snap to the closest card on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = 366; // w-[366px] = 366px
      const gap = 16; // gap-x-4 = 16px
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      // Calculate the index of the closest card
      const cardIndex = Math.round((scrollLeft + containerWidth / 2 - cardWidth / 2) / (cardWidth + gap));
      const targetScroll = cardIndex * (cardWidth + gap) - (containerWidth - cardWidth) / 2; // Center the card

      // Smoothly scroll to the closest card
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      console.log("Snap scroll:", { scrollLeft, cardIndex, targetScroll, containerWidth });
    };

    container.addEventListener("scrollend", handleScroll);
    return () => container.removeEventListener("scrollend", handleScroll);
  }, []);

  // Mouse drag functionality
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="relative mt-10 z-10 w-full overflow-x-hidden">
      <div
        ref={scrollContainerRef}
        className={`
          relative flex overflow-x-auto min-w-[430px] max-w-full
          snap-x snap-mandatory px-4 py-4 rounded-xl shadow-md gap-x-4
          ${isDarkMode ? "bg-zinc-900 border border-zinc-700" : "bg-[#066658] border border-green-300"}
          scrollbar-hide cursor-grab select-none
        `}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        role="list"
      >
        <div
          className="flex gap-x-4 sm:pl-[calc(50vw-183px)] sm:pr-[calc(50vw-183px)] pl-4 pr-4"
        >
          {floatingList.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              onKeyDown={(e) => handleKeyDown(e, item.path)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.name}`}
              className={`
                snap-center cursor-pointer rounded-xl shadow-lg h-[206px] w-[366px]
                bg-center bg-cover bg-no-repeat transition-transform duration-300
                hover:scale-105 focus:scale-105 focus:outline-none relative
                min-w-[366px] min-h-[206px]
                ${isDarkMode ? "border border-zinc-700" : "border border-white"}
              `}
              style={{ backgroundImage: `url(${item.img || 'https://via.placeholder.com/366x206'})`, backgroundPosition: 'center' }}
              title={item.name}
            >
              <div
                className={`
                  absolute bottom-0 left-0 right-0 rounded-b-xl p-2 z-20
                  ${isDarkMode ? "bg-black bg-opacity-50" : "bg-green-800 bg-opacity-60"}
                `}
              >
                <p className="text-white font-semibold text-sm truncate">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Vignette overlays */}
      <div
        className={`
          absolute inset-y-0 left-0 w-24 bg-gradient-to-r z-10
          ${isDarkMode ? "from-zinc-900 to-transparent" : "from-[#066658] to-transparent"}
        `}
      ></div>
      <div
        className={`
          absolute inset-y-0 right-0 w-24 bg-gradient-to-l z-10
          ${isDarkMode ? "from-zinc-900 to-transparent" : "from-[#066658] to-transparent"}
        `}
      ></div>
    </div>
  );
};

export default FloatingApps;