import React from 'react';

const AISection = () => {
  return (
    <section className="py-20 text-center bg-gray-50">
      <div className="px-6">
        {/* Section heading */}
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Powered by
        </h2>
        <p className="text-4xl font-bold text-gray-900 mb-16">
          top-tier AI
        </p>
        
        {/* AI features grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* AI Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Email Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI understands context, urgency, and sentiment to automatically categorize and prioritize your emails.
              </p>
            </div>
            
            {/* AI Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Generated Responses</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate contextually appropriate responses that match your communication style and tone preferences.
              </p>
            </div>
            
            {/* AI Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-left">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Task Creation</h3>
              <p className="text-gray-600 leading-relaxed">
                Transform emails into actionable tasks with due dates, priorities, and relevant context automatically extracted.
              </p>
            </div>
            
            {/* AI Feature 4 */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-left">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learning & Adaptation</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuously learns from your preferences to provide increasingly personalized and accurate assistance.
              </p>
            </div>
          </div>
        </div>
        
        {/* AI provider logos */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">○</span>
            </div>
            <span className="font-semibold">OpenAI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-semibold">Claude</span>
          </div>
        </div>
        
        {/* Write with AI badge */}
        <div className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium">
          ✨ Write with AI
        </div>
      </div>
    </section>
  );
};

export default AISection; 