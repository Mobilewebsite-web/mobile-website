import { useState } from "react";
import CustomerContactForm from "../components/CustomerSupportComponents/CustomerContactForm";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "All logins and signup are handled by google so there are no passwords involved. Please make sure you sign up with goole and beware of site that impersonate us and ask for sensitive information",
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

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Customer Support</h1>
      <p className="text-gray-600 text-center mb-8">
        We're here to help. Check out the FAQ below or contact us directly.
      </p>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-4 py-3 bg-gray-100 font-medium hover:bg-gray-200"
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 text-gray-700 bg-white border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <CustomerContactForm/>

      {/* Optional Live Chat */}
      {/* <div className="text-center mt-10">
        <p className="text-sm text-gray-500">Need urgent help?</p>
        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Start Live Chat
        </button>
      </div> */}
    </div>
  );
};

export default CustomerSupport;
