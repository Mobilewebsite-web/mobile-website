import { Carousel } from 'flowbite-react';
import display1 from '../../assets/images/mcgg.jpeg';
import display2 from '../../assets/images/display2.jpg';
import display3 from '../../assets/images/display3.jpg';

export default function Display() {
  return (
    <div className="relative h-56 mt-10 sm:h-64 md:h-80 lg:w-[60%] mx-auto rounded-lg overflow-hidden">
      
      {/* Four-side gradient overlay for fading border */}
      <div className="pointer-events-none absolute inset-0 z-90">
        {/* Top */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/50 to-transparent" />
        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Left */}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/50 to-transparent" />
        {/* Right */}
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/50 to-transparent" />
      </div>

      {/* Actual carousel */}
      <div className="relative z-20 h-full">
        <Carousel slideInterval={3000} pauseOnHover loop>
          <img src={display1} alt="Slide 1" className="w-full h-full object-cover" />
          <img src={display2} alt="Slide 2" className="w-full h-full object-cover" />
          <img src={display3} alt="Slide 3" className="w-full h-full object-cover" />
        </Carousel>
      </div>
    </div>
  );
}
