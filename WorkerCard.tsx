import React from 'react';
import { WorkerProfile } from './types';

interface WorkerCardProps {
  worker: WorkerProfile;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const handleContact = () => {
    alert(`Calling ${worker.name} at ${worker.phone}...`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full border border-gray-100 group">
      {/* Card Header / Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={worker.imageUrl} 
          alt={worker.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm animate-fade-in-up">
          ₹{worker.hourlyRate}/hr
        </div>
        {worker.isVerified && (
           <div className="absolute bottom-2 left-2 bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
             <i className="fas fa-check-circle"></i> Verified
           </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-green-700 transition-colors">{worker.name}</h3>
          <div className="flex items-center text-yellow-500 text-sm bg-yellow-50 px-2 py-0.5 rounded-full">
             <i className="fas fa-star mr-1"></i>
             <span className="font-semibold">{worker.rating}</span>
             <span className="text-gray-400 ml-1 text-xs">({worker.reviews})</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-semibold text-xs text-orange-600">
          {worker.category}
        </p>

        {/* Location */}
        <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
           <i className="fas fa-map-marker-alt text-red-400"></i> {worker.location}
        </p>

        {/* Explicitly showing the phone number */}
        <p className="text-gray-700 text-sm mb-3 flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100 group-hover:border-green-100 group-hover:bg-green-50 transition-colors">
          <i className="fas fa-phone text-green-600"></i> 
          <span className="font-mono font-medium">{worker.phone}</span>
        </p>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {worker.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {worker.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
              {service}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleContact}
          className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-all shadow-md hover:shadow-green-500/30 active:scale-95 flex items-center justify-center gap-2"
        >
          <i className="fas fa-phone-alt animate-pulse"></i> Call Now
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;