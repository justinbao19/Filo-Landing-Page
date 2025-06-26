import React from 'react';

const CloserLookSection = () => {
  return (
    <section className="py-20 text-center">
      <div className="px-6">
        {/* Section heading */}
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          A Closer Look
        </h2>
        
        {/* "Design" badge */}
        <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-16">
          Design
        </div>
        
        {/* Phone mockup container */}
        <div className="flex justify-center items-center">
          <div className="relative">
            {/* Blue circular background */}
            <div className="w-80 h-80 bg-blue-400 rounded-full flex items-center justify-center">
              {/* Phone mockup */}
              <div className="w-48 h-96 bg-white rounded-3xl shadow-2xl p-4 relative">
                {/* Phone screen content */}
                <div className="w-full h-full bg-gray-50 rounded-2xl p-4">
                  {/* Status bar */}
                  <div className="flex justify-between items-center mb-6 text-xs">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                      <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                      <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App content */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="w-full h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="w-full h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="w-full h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI elements */}
            <div className="absolute -left-8 top-16 bg-white rounded-lg shadow-lg p-3 text-xs">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="absolute -right-8 bottom-16 bg-white rounded-lg shadow-lg p-3 text-xs">
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloserLookSection; 