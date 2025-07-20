import React from 'react';
import { useUser } from '../../context/UserContext';
import ml1 from '../../assets/images/ml1.jpeg';

const reasons = [

  {
    title: 'Instant Delivery ⚡',
    desc: 'No waiting! Enjoy lightning-fast delivery for your digital purchases.',
  },
  {
    title: 'Trusted Platform 🛡️',
    desc: 'Secure, reliable, and trusted by thousands of gamers and buyers.',
  },
];

const Why = () => {
  const { isDarkMode } = useUser();

  return (
    <section z-40>
    <div
      className={`py-6 mt-10 px-4 rounded-md bg-white backdrop-blur-sm mx-3 mb-4 border border-black shadow-xl ${
        isDarkMode ? 'bg-darkElementBg text-white' : 'bg-[#c9e3e3]/90 text-zinc-800'
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
        {reasons.map((item, i) => (
          <div
  key={i}
  className={`p-4 rounded-md border-neutral-600 shadow-sm shadow-lime-900 transition-transform transform hover:scale-105 hover:shadow-3xl
 duration-300 ease-in-out ${
    isDarkMode
      ? 'bg-darkElementBg text-white/80'
      : 'bg-white text-zinc-800'
  }`}
>
  <h3 className="text-xs font-bold mb-2">{item.title}</h3>
  <p className="text-[10px] font-semibold">{item.desc}</p>
</div>

        ))}
      </div>

    </div>
    </section>
  );
};

export default Why;
