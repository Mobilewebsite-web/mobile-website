export default function MarqueeBox() {
  return (
    <div className="absolute top-2 right-3 flex scale-90">
      {/* Left half */}
      <div className="relative w-[80px] h-[30px] lg:w-[90px] lg:h-[35px] leading-[30px] lg:leading-[30px] text-[1rem] lg:text-[1.3rem] font-bold font-sans whitespace-nowrap overflow-hidden bg-[indianred] text-[darkred]">
        <div
          className="absolute w-full h-full"
          style={{
            transformOrigin: 'right',
            transform: 'perspective(80px) rotateY(-15deg)',
          }}
        >
          <span className="absolute left-full animate-marquee [animation-delay:2.4s]">
            Leo Official Store
          </span>
        </div>
      </div>

      {/* Right half */}
      <div className="relative w-[80px] h-[30px] lg:w-[90px] lg:h-[35px] leading-[30px] lg:leading-[30px] lg:text-[1.3rem] text-[1rem] font-bold font-sans whitespace-nowrap overflow-hidden bg-[lightcoral] text-[antiquewhite]">
        <div
          className="absolute w-full h-full"
          style={{
            transformOrigin: 'left',
            transform: 'perspective(80px) rotateY(15deg)',
          }}
        >
          <span className="absolute left-full animate-marquee [animation-delay:0s]">
            Leo Official Store
          </span>
        </div>
      </div>
    </div>
  );
}
