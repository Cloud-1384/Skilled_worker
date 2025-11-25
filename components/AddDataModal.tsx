import React, { useState } from 'react';
import { WorkerCategory, WorkerProfile, Product } from '../types';
import { CATEGORIES_LIST } from '../constants';

interface AddDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorker: (worker: WorkerProfile) => void;
  onAddProduct: (product: Product) => void;
}

const AddDataModal: React.FC<AddDataModalProps> = ({ isOpen, onClose, onAddWorker, onAddProduct }) => {
  const [activeTab, setActiveTab] = useState<'worker' | 'product'>('worker');

  // Worker Form State
  const [workerName, setWorkerName] = useState('');
  const [workerPhone, setWorkerPhone] = useState('');
  const [workerCategory, setWorkerCategory] = useState<WorkerCategory>(WorkerCategory.PLUMBER);
  const [workerRate, setWorkerRate] = useState('');
  const [workerDesc, setWorkerDesc] = useState('');
  const [workerLocation, setWorkerLocation] = useState('');
  
  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('Tools');

  if (!isOpen) return null;

  const handleSubmitWorker = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorker: WorkerProfile = {
      id: Date.now().toString(),
      name: workerName,
      phone: workerPhone,
      category: workerCategory,
      hourlyRate: Number(workerRate) || 100,
      description: workerDesc || 'Professional service provider.',
      rating: 5.0,
      reviews: 0,
      services: [workerCategory],
      imageUrl: `https://ui-avatars.com/api/?name=${workerName.replace(' ', '+')}&background=random`,
      location: workerLocation || 'Nizamabad',
      isVerified: true
    };
    onAddWorker(newWorker);
    resetForms();
    onClose();
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: prodName,
      price: Number(prodPrice) || 0,
      category: prodCategory,
      rating: 5.0,
      image: 'https://placehold.co/300x200?text=Tool',
    };
    onAddProduct(newProduct);
    resetForms();
    onClose();
  };

  const resetForms = () => {
    setWorkerName('');
    setWorkerPhone('');
    setWorkerRate('');
    setWorkerDesc('');
    setWorkerLocation('');
    setProdName('');
    setProdPrice('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gray-900 p-4 text-white flex justify-between items-center">
          <h2 className="font-bold text-lg">Add New Listing</h2>
          <button onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'worker' ? 'text-green-600 border-b-2 border-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('worker')}
          >
            <i className="fas fa-user-hard-hat mr-2"></i> Add Professional
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'product' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('product')}
          >
             <i className="fas fa-box-open mr-2"></i> Add Product
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {activeTab === 'worker' ? (
            <form onSubmit={handleSubmitWorker} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <input required type="text" value={workerName} onChange={e => setWorkerName(e.target.value)} className="w-full border rounded p-2" placeholder="e.g. Rahul Kumar" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input required type="tel" value={workerPhone} onChange={e => setWorkerPhone(e.target.value)} className="w-full border rounded p-2" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                <input required type="text" value={workerLocation} onChange={e => setWorkerLocation(e.target.value)} className="w-full border rounded p-2" placeholder="e.g. Nizamabad, Telangana" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select value={workerCategory} onChange={e => setWorkerCategory(e.target.value as WorkerCategory)} className="w-full border rounded p-2">
                    {CATEGORIES_LIST.filter(c => c.name !== 'All').map(c => (
                      <option key={c.type} value={c.type}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Rate (₹/hr)</label>
                  <input required type="number" value={workerRate} onChange={e => setWorkerRate(e.target.value)} className="w-full border rounded p-2" placeholder="200" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea value={workerDesc} onChange={e => setWorkerDesc(e.target.value)} className="w-full border rounded p-2 h-20" placeholder="Describe skills..." />
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold">
                Publish Profile
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
                <input required type="text" value={prodName} onChange={e => setProdName(e.target.value)} className="w-full border rounded p-2" placeholder="e.g. Hammer Drill" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <input type="text" value={prodCategory} onChange={e => setProdCategory(e.target.value)} className="w-full border rounded p-2" placeholder="Tools" />
                </div>
                <div className="flex-1">
                   <label className="block text-xs font-bold text-gray-700 mb-1">Price (₹)</label>
                   <input required type="number" value={prodPrice} onChange={e => setProdPrice(e.target.value)} className="w-full border rounded p-2" placeholder="500" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                List Product
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDataModal;