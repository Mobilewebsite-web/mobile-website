import { useState } from "react";
import CustomerContactForm from "../components/CustomerSupportComponents/CustomerContactForm";
import { useUser } from "../context/UserContext";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "All logins and signup are handled by google so there are no passwords involved. Please make sure you sign up with google and beware of sites that impersonate us and ask for sensitive information.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order from the Orders page in your home page. Note the Order Id and search it or browse through it.",
  },
  {
    question: "I was charged but didn’t receive anything. What should I do?",
    answer:
      "Please contact support with your order ID. We’ll verify and resolve the issue within 24 hours.",
  },
];

const CustomerSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isDarkMode } = useUser();

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

return (
  <div
    className={`mx-auto sm:px-10 py-10 ${
      isDarkMode
        ? "bg-zinc-900 text-white"
        : "bg-webGreen text-webGreenLight"
    }`}
  >
    <h1 className="text-4xl font-bold mb-4 text-center text-webGreenLight">
      Customer Support
    </h1>
    <p
      className={`text-center mb-8 ${
        isDarkMode ? "text-gray-400" : "text-webGreenLight/80"
      }`}
    >
      We're here to help. Check out the FAQ below or contact us directly.
    </p>

    {/* FAQ */}
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-webGreenLight">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden ${
              isDarkMode
                ? "border-zinc-700 bg-zinc-800"
                : "border-webGreenLight bg-webGreenLight"
            }`}
          >
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full text-left px-4 py-3 font-medium hover:bg-opacity-80 transition ${
                isDarkMode
                  ? "bg-zinc-700 hover:bg-zinc-600"
                  : "bg-webGreenLight  text-black hover:bg-webGreen/70"
              }`}
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div
                className={`px-4 py-3 border-t ${
                  isDarkMode
                    ? "border-zinc-700 bg-zinc-900 text-gray-300"
                    : "border-webGreenLight bg-webGreenLight text-webGreenLight"
                }`}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Contact Form */}
    <CustomerContactForm isDarkMode={isDarkMode} />

    {/* Optional Live Chat */}
    {/* <div className="text-center mt-10">
      <p className={`${isDarkMode ? "text-gray-400" : "text-webGreenLight/80"} text-sm`}>
        Need urgent help?
      </p>
      <button className="mt-2 bg-webGreen text-webGreenLight px-4 py-2 rounded hover:bg-webGreenLight/90 transition">
        Start Live Chat
      </button>
    </div> */}
  </div>
);

};

export default CustomerSupport;
