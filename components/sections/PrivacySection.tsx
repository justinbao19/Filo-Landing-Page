import React from 'react';

const PrivacySection = () => {
  return (
    <section className="py-20">
      <div className="px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image placeholder */}
            <div className="order-2 md:order-1">
              <div className="bg-amber-100 rounded-lg p-8 text-center">
                {/* Safe/Vault illustration placeholder */}
                <div className="w-48 h-48 mx-auto bg-amber-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-32 h-32 bg-amber-900 rounded-lg flex items-center justify-center">
                    <span className="text-4xl text-amber-100">🔒</span>
                  </div>
                </div>
                <p className="text-amber-800 font-medium">Your data stays secure</p>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                No peeking,
              </h2>
              <p className="text-4xl font-bold text-gray-900 mb-8">
                promise
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>End-to-end encryption</strong> - Your emails are encrypted before they reach our servers
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Zero-knowledge architecture</strong> - We can't read your emails even if we wanted to
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Local processing</strong> - AI analysis happens on your device when possible
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>GDPR compliant</strong> - Full compliance with European privacy regulations
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 leading-relaxed">
                We built Filo with privacy at its core. Your sensitive information never leaves your control, 
                and our AI works with encrypted data to ensure your communications remain completely private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection; 