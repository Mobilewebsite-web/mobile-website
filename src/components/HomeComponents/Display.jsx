import { useUser } from '../../context/UserContext';
import display1 from '../../assets/images/mcgg.jpeg';
import display2 from '../../assets/images/gus.mp4';
import display3 from '../../assets/images/display3.jpg';
import display4 from '../../assets/images/ling.mp4';
import display5 from '../../assets/images/hok1.mp4';
import display6 from '../../assets/images/aov.mp4';

const Display = () => {
  const { isDarkMode } = useUser();

  const items = [
    { type: 'image', src: display1 },
    { type: 'image', src: display3 },
    { type: 'video', src: display2 },
    { type: 'video', src: display4 },
    { type: 'video', src: display5 },
    { type: 'video', src: display6 },
  ];

  return (
    <div className="overflow-hidden mt-10 mx-4 rounded-lg overflow-hiddn">
      <div
        className={`flex w-max animate-scroll-left bg-lightGreen gap-3 ${
          isDarkMode ? 'bg-darkBg' : ''
        }`}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="min-w-[300px] h-[180px] rounded overflow-hidden shadow-md">
            {item.type === 'image' ? (
              <img src={item.src} className="h-full w-full object-cover" alt={`slide-${i}`} />
            ) : (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
