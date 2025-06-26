import React from 'react';

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Filo work?",
      answer: "Filo connects to your email account and uses AI to analyze incoming messages, automatically converting them into actionable tasks with relevant context and suggested responses."
    },
    {
      question: "What kinds of email can Filo be the best?",
      answer: "Filo excels with work emails, project communications, meeting requests, and any emails that require follow-up actions or responses."
    },
    {
      question: "Is my data secure with Filo?",
      answer: "Absolutely. We use end-to-end encryption and zero-knowledge architecture to ensure your emails remain completely private and secure."
    },
    {
      question: "How can I use Filo feedback?",
      answer: "You can provide feedback through the app's settings menu, and our AI learns from your corrections to improve future suggestions and task creation."
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section heading */}
          <h2 className="text-5xl font-bold text-center mb-16">
            Questions?
          </h2>
          
          {/* FAQ items */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-700 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          {/* Contact info */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              Have more questions? We'd love to help.
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 