import React from 'react';

const EmailToTaskSection = () => {
  return (
    <section className="py-20 text-center">
      <div className="px-6">
        {/* Section heading */}
        <h2 className="text-5xl font-bold text-gray-900 mb-16">
          Email in, Task out
        </h2>
        
        {/* Flow visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Email mockup */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-sm">John Smith</div>
                      <div className="text-xs text-gray-500">john@example.com</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">2:30 PM</div>
                </div>
                
                <h3 className="font-semibold mb-2">Project Update Meeting</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Hey team, we need to schedule a meeting to discuss the Q4 project updates. 
                  Please let me know your availability for next week.
                </p>
                
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded text-xs">Reply</button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-xs">Forward</button>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center mb-8">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                ↓
              </div>
            </div>
            
            {/* Task output */}
            <div className="bg-green-50 rounded-lg p-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Task Created</span>
                </div>
                <div className="text-xs text-gray-500">Due: Next Week</div>
              </div>
              
              <h3 className="font-semibold mb-2">Schedule Q4 Project Update Meeting</h3>
              <p className="text-sm text-gray-600 mb-4">
                Coordinate with team members to find suitable time slots for Q4 project discussion.
              </p>
              
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Meeting</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">High Priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailToTaskSection; 