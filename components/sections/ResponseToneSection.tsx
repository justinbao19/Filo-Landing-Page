import React from 'react';

const ResponseToneSection = () => {
  const tones = [
    {
      type: "Positive",
      color: "bg-blue-200",
      textColor: "text-blue-900",
      content: "Great idea! I'd love to collaborate on this project. Let me know when you're available to discuss the details further.",
      description: "Use when you want to be enthusiastic and supportive"
    },
    {
      type: "Negative", 
      color: "bg-red-200",
      textColor: "text-red-900",
      content: "I appreciate you thinking of me, but I won't be able to take on this project due to my current commitments.",
      description: "Use when you need to decline politely but firmly"
    },
    {
      type: "Neutral",
      color: "bg-yellow-200", 
      textColor: "text-yellow-900",
      content: "Thank you for reaching out. I've reviewed your proposal and will need some time to consider the details before responding.",
      description: "Use when you want to remain professional and balanced"
    }
  ];

  return (
    <section className="py-20 text-center">
      <div className="px-6">
        {/* Section heading */}
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Respond
        </h2>
        <p className="text-4xl font-bold text-gray-900 mb-16">
          the tone you want
        </p>
        
        {/* Tone cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tones.map((tone, index) => (
            <div key={index} className="text-left">
              {/* Tone label */}
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-900">
                  {tone.type}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {tone.description}
                </p>
              </div>
              
              {/* Sticky note */}
              <div className={`${tone.color} p-6 rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-transform cursor-pointer`}>
                <div className={`${tone.textColor} font-handwriting text-sm leading-relaxed`}>
                  {tone.content}
                </div>
                
                {/* Sticky note tape effect */}
                <div className="absolute -top-2 left-8 w-8 h-4 bg-yellow-300 opacity-60 rounded-sm transform -rotate-12"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom description */}
        <div className="mt-16 max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg">
            Choose the perfect tone for every response. Our AI adapts your message to match your intended sentiment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResponseToneSection; 