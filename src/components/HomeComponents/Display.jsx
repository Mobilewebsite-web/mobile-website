import { Carousel } from 'flowbite-react';
import display1 from '../../assets/images/mcgg.jpeg';
import display2 from '../../assets/images/gus.mp4';
import display3 from '../../assets/images/display3.jpg';
import display4 from '../../assets/images/ling.mp4'; // ideally use a .webm with transparency if needed
import display5 from '../../assets/images/hok1.mp4';
import display6 from '../../assets/images/aov.mp4'
import { useUser } from '../../context/UserContext';



export default function Display() {

    const { isDarkMode } = useUser();

  return (
    <div className="mx-4">
  <div
    className={`relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 mt-10 lg:w-[80%] mx-auto rounded-lg overflow-hidden
      ${isDarkMode ? 'shadow-sky-400' : 'shadow-sky-400'}`}
  >
    <div className="relative h-full">
      <Carousel slideInterval={3000} pauseOnHover loop>
        <img src={display1} alt="Slide 1" className="w-full h-full object-cover" />
        <img src={display3} alt="Slide 3" className="w-full h-full object-cover" />
        
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={display2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={display5} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src={display6} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Carousel>
    </div>
  </div>
</div>

  );
}
