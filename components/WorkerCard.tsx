import React from 'react';
import { WorkerProfile } from '../types';

interface WorkerCardProps {
  worker: WorkerProfile;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const handleContact = () => {
    alert(`Calling ${worker.name} at ${worker.phone}...`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 group">
      {/* Card Header / Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img 
          src={worker.imageUrl} 
          alt={worker.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm z-10">
          ₹{worker.hourlyRate}/hr
        </div>
        {worker.isVerified && (
           <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
             <i className="fas fa-check-circle"></i> VERIFIED
           </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors">{worker.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 text-sm bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
             <i className="fas fa-star text-xs"></i>
             <span className="font-bold text-gray-800">{worker.rating}</span>
             <span className="text-gray-400 text-xs">({worker.reviews})</span>
          </div>
        </div>

        <div className="mb-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
            {worker.category}
          </span>
        </div>

        {/* Location */}
        <p className="text-gray-500 text-xs mb-3 flex items-center gap-1.5">
           <i className="fas fa-map-marker-alt text-gray-300"></i> {worker.location}
        </p>

        {/* Explicitly showing the phone number */}
        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 group-hover:border-green-200 group-hover:bg-green-50/50 transition-colors mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm">
             <i className="fas fa-phone text-xs"></i>
          </div>
          <span className="font-mono font-medium text-gray-700 text-sm tracking-tight">{worker.phone}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 flex-grow leading-relaxed">
          {worker.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {worker.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className="bg-white text-gray-500 text-[10px] font-medium px-2 py-1 rounded border border-gray-200">
              {service}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleContact}
          className="w-full mt-auto bg-gray-900 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-gray-200 hover:shadow-green-200 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <i className="fas fa-phone-alt animate-pulse"></i> Contact Now
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;