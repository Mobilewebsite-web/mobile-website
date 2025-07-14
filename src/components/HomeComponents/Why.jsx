import React from 'react';

const reasons = [
  {
    title: 'Earn Rewards 💰',
    desc: 'Earn exciting cashback and points with every transaction you make.',
  },
  {
    title: 'Instant Delivery ⚡',
    desc: 'No waiting! Enjoy lightning-fast delivery for your digital purchases.',
  },
  {
    title: 'Convenient Payments 💳',
    desc: 'Multiple secure payment methods including UPI, Wallet, Cards and more.',
  },
  {
    title: '24/7 Support 🛠️',
    desc: 'Need help? Our support team is available any time, any day.',
  },
  {
    title: 'Exciting Promotions 🎉',
    desc: 'Grab limited-time discounts, offers, and exclusive bonus deals.',
  },
  {
    title: 'Trusted Platform 🛡️',
    desc: 'Secure, reliable, and trusted by thousands of gamers and buyers.',
  },
];

const Why = () => {
  return (
    <section className="py-10 mt-10 px-4 bg-white text-zinc-800">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reasons.map((item, i) => (
          <div
            key={i}
            className="bg-sky-50  p-6 rounded-xl shadow transition-all hover:scale-[1.01] hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Why;
