import React from 'react';

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 text-center">
      <div className="max-w-4xl mx-auto px-6">
        {/* Logo placeholder */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Filo
          </h1>
        </div>
        
        {/* Main heading */}
        <h2 className="text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Inbox to Done
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Transform your email chaos into organized tasks. Filo intelligently converts your emails into actionable tasks with AI-powered insights.
        </p>
        
        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
            <span>📱</span>
            App Store
          </button>
          <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 