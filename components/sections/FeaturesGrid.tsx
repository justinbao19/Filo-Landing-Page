import React from 'react';

const FeaturesGrid = () => {
  const features = [
    {
      title: "Dashboard AI",
      description: "AI-powered dashboard that organizes your tasks intelligently",
      placeholder: "📊"
    },
    {
      title: "Frame, Dashboard", 
      description: "Beautiful frames and dashboard layouts for better visualization",
      placeholder: "🖼️"
    },
    {
      title: "What do I say?",
      description: "AI suggests the perfect responses for your emails",
      placeholder: "💬"
    },
    {
      title: "More Brain Balanced",
      description: "Balanced approach to email management and task organization",
      placeholder: "🧠"
    },
    {
      title: "Intuitive Auto Aid",
      description: "Automatic assistance that learns from your preferences",
      placeholder: "🤖"
    }
  ];

  return (
    <section className="py-16">
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Placeholder for image */}
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-4xl">
                {feature.placeholder}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                {feature.title}
              </h3>
              
              <p className="text-xs text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid; 