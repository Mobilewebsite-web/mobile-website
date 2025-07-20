import { useNavigate } from "react-router-dom";
import ml from "../../assets/images/mlbb-logo.jpeg";
import hok from "../../assets/images/hok.jpeg";
import React, { useRef, useEffect, useCallback } from "react";
import { useUser } from "../../context/UserContext";

const FloatingApps = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useUser();
  const scrollRef = useRef(null);
  const isProgrammatic = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const isDragging = useRef(false);
  const dims = useRef({ cardW: 0, containerW: 0 });
  const autoScrollInterval = useRef(null);
  const didDrag = useRef(false);


  const floatingList = [
    { name: "Mobile Legends", path: "/recharge/mobile-legends", img: ml },
    { name: "Honor of Kings", path: "/recharge/game2", img: hok },
    { name: "Game 3", path: "/recharge/game3", img: ml },
  ];

  const N = floatingList.length;
  const list = [...floatingList, ...floatingList, ...floatingList]; // triple array

  // Preload images
  useEffect(() => {
    list.forEach(item => new Image().src = item.img);
  }, [list]);

  // Prevent horizontal overflow
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => { document.body.style.overflowX = ''; };
  }, []);

  // Resize listener
  useEffect(() => {
    const measure = () => {
      const c = scrollRef.current;
      const cards = c?.querySelectorAll('.card');
      if (cards?.length) {
        dims.current = {
          cardW: cards[0].offsetWidth,
          containerW: c.offsetWidth,
        };
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Center on mount
  useEffect(() => {
    setTimeout(() => {
      const { cardW } = dims.current;
      const gap = 16;
      const targetIdx = N + 1; // middle second card
      const scrollX = targetIdx * (cardW + gap);
      const c = scrollRef.current;
      isProgrammatic.current = true;
      c.scrollTo({ left: scrollX, behavior: 'auto' });
      requestAnimationFrame(() => isProgrammatic.current = false);
    }, 100);
  }, [N]);

  // Infinite loop + snap logic
  const handleSnap = useCallback(() => {
    if (isProgrammatic.current) return;
    const c = scrollRef.current;
    const { cardW } = dims.current;
    const gap = 16;
    const idx = Math.round(c.scrollLeft / (cardW + gap));

    // Snap
    const x = idx * (cardW + gap);
    isProgrammatic.current = true;
    c.scrollTo({ left: x, behavior: 'smooth' });
    requestAnimationFrame(() => isProgrammatic.current = false);

    // Loop reset
    const midStart = N;
    if (idx < midStart - 1 || idx > midStart * 2) {
      const mod = ((idx % N) + N) % N;
      const newX = (midStart + mod) * (cardW + gap);
      isProgrammatic.current = true;
      setTimeout(() => {
        c.scrollTo({ left: newX, behavior: 'auto' });
        requestAnimationFrame(() => isProgrammatic.current = false);
      }, 300);
    }
  }, [N]);

  // Scroll handler
  useEffect(() => {
    const c = scrollRef.current;
    let timeout;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleSnap();
      }, 50);
    };
    c?.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      c?.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, [handleSnap]);

  // Auto-scroll
 useEffect(() => {
  autoScrollInterval.current = setInterval(() => {
    const c = scrollRef.current;
    const { cardW } = dims.current;
    c?.scrollBy({ left: cardW + 16, behavior: 'smooth' });
  }, 3500);

  return () => {
    clearInterval(autoScrollInterval.current);
    autoScrollInterval.current = null;
  };
}, []);


  // Drag handlers
const onDown = (e) => {
  clearInterval(autoScrollInterval.current);
  autoScrollInterval.current = null;

  isDragging.current = true;
  didDrag.current = false;
  dragStartX.current = (e.touches?.[0]?.pageX || e.pageX) - scrollRef.current.offsetLeft;
  dragStartScroll.current = scrollRef.current.scrollLeft;
  scrollRef.current.style.cursor = 'grabbing';
};



const onMove = (e) => {
  if (!isDragging.current) return;
  didDrag.current = true;

  const x = (e.touches?.[0]?.pageX || e.pageX) - scrollRef.current.offsetLeft;
  scrollRef.current.scrollLeft = dragStartScroll.current - (x - dragStartX.current) * 1.4;
};


const onUp = () => {
  isDragging.current = false;
  scrollRef.current.style.cursor = 'grab';

  // Only restart auto-scroll if user dragged
  if (didDrag.current && !autoScrollInterval.current) {
    autoScrollInterval.current = setInterval(() => {
      const { cardW } = dims.current;
      scrollRef.current?.scrollBy({ left: cardW + 16, behavior: 'smooth' });
    }, 3500);
  }

  didDrag.current = false; // Reset
};



  return (
    <div className="relative w-full overflow-x-hidden mt-10">
      <div className="relative w-full overflow-x-hidden">
        <div
          ref={scrollRef}
          className={`
            relative flex overflow-x-auto snap-x snap-mandatory gap-x-4 px-4 py-4 rounded-xl shadow-md
            ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-darkGreen border border-darkGreen'}
            cursor-grab select-none scrollbar-none
          `}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
          style={{
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div className="flex gap-x-4 pl-[calc(50vw-140px)] pr-[calc(50vw-140px)]">
            {list.map((item, i) => (
              <div
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => navigate(item.path)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(item.path)}
                title={item.name}
                className={` relative
                  snap-center w-72 h-40 rounded-xl shadow-lg bg-cover bg-center cursor-pointer
                  transition-transform duration-500 hover:scale-105 card
                  ${isDarkMode ? 'border border-zinc-700' : 'border border-blue-900'}
                `}
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-b from-transparent to-iconColor bg-opacity-90 rounded-b-xl">
                  <p className="text-white font-semibold text-sm text-center truncate">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Green fade vignette overlays */}
      <div className={`absolute  inset-y-0 left-0 w-16 z-30 ${ isDarkMode ? "bg-gradient-to-r from-darkBg to-transparent" : "bg-gradient-to-r from-webGreen to-transparent"} pointer-events-none`}/>
      <div className={`absolute  inset-y-0 right-0 w-32 z-30 ${ isDarkMode ? "bg-gradient-to-l from-darkBg to-transparent" : "bg-gradient-to-l from-webGreen to-transparent"} pointer-events-none`}/>
    </div>
  );
};

export default FloatingApps;
