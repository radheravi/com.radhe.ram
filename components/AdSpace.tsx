import React from 'react';

interface AdSpaceProps {
  className?: string;
  type?: 'banner' | 'sidebar';
}

export const AdSpace: React.FC<AdSpaceProps> = ({ className = '', type = 'sidebar' }) => {
  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 p-4 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-widest mb-2">Advertisement</span>
      {type === 'banner' ? (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Download "Radhe Pro" for Ad-Free Experience</p>
        </div>
      ) : (
        <div className="text-center space-y-2">
           <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
           <p className="text-sm text-gray-500">Best Parenting Deals</p>
           <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded">Shop Now</button>
        </div>
      )}
    </div>
  );
};