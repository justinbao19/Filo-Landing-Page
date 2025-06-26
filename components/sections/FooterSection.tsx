import React from 'react';

const FooterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and title */}
          <div className="mb-12">
            <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">F</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              The Start of Filo
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Ready to transform your email experience? Join thousands of users who have already made the switch to smarter email management.
            </p>
            
            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                <span>📱</span>
                Download on App Store
              </button>
              <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Get Started Free
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Available on iPhone, iPad, and Mac. Coming soon to Android and Windows.
            </p>
          </div>
          
          {/* Footer navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500">Features</a></li>
                <li><a href="#" className="hover:text-blue-500">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-500">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500">About</a></li>
                <li><a href="#" className="hover:text-blue-500">Blog</a></li>
                <li><a href="#" className="hover:text-blue-500">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-500">Contact</a></li>
                <li><a href="#" className="hover:text-blue-500">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-500">Terms</a></li>
                <li><a href="#" className="hover:text-blue-500">Security</a></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 Filo. All rights reserved. Made with ❤️ for productivity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection; 