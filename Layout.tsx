import React, { useState } from 'react';
import { CATEGORIES_LIST } from './constants';
import { WorkerCategory } from './types';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: WorkerCategory;
  onCategoryChange: (cat: WorkerCategory) => void;
  onSearch: (query: string) => void;
  onOpenAI: () => void;
  onOpenAdd: () => void;
  currentView: 'home' | 'about' | 'products' | 'others';
  onChangeView: (view: 'home' | 'about' | 'products' | 'others') => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeCategory, 
  onCategoryChange, 
  onSearch,
  onOpenAI,
  onOpenAdd,
  currentView,
  onChangeView
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar (Sticky Top) */}
      <nav className="sticky top-0 z-40 bg-white h-16 border-b border-gray-200 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { onChangeView('home'); onCategoryChange(WorkerCategory.ALL); }}>
             <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-white font-bold">
               <i className="fas fa-hands-helping"></i>
             </div>
             <span className="font-bold text-xl tracking-tight hidden sm:block text-gray-800">Skilled<span className="text-green-600">Helpers</span></span>
             <span className="font-bold text-xl tracking-tight md:hidden text-gray-800">Skilled<span className="text-green-600">Helpers</span></span>
          </div>
        </div>

        {/* Search Bar (Center) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-4 relative">
          <input
            type="text"
            placeholder="Search for plumbers, painters..."
            className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:border-green-500 focus:bg-white transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-0 h-full px-5 bg-gray-100 border-l border-gray-300 rounded-r-full text-gray-600 hover:bg-gray-200">
             <i className="fas fa-search"></i>
          </button>
        </form>

        <div className="flex items-center gap-3">
           {/* Add Listing Button (Desktop) */}
           <button 
             onClick={onOpenAdd}
             className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-800 transition-colors"
           >
             <i className="fas fa-plus"></i> Add Listing
           </button>

           <button 
             onClick={onOpenAI}
             className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
           >
             <i className="fas fa-magic"></i> AI Helper
           </button>
           <button className="text-gray-600 p-2 hover:bg-gray-100 rounded-full md:hidden" onClick={() => { onChangeView('home'); onCategoryChange(WorkerCategory.ALL); }}> {/* Search Icon Mobile */}
             <i className="fas fa-search"></i>
           </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
          <div className="p-4 space-y-2">
            <button 
               onClick={() => { onChangeView('home'); onCategoryChange(WorkerCategory.ALL); }}
               className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${currentView === 'home' && activeCategory === WorkerCategory.ALL ? 'bg-gray-100 font-bold text-black' : 'hover:bg-gray-100 text-gray-700'}`}
            >
               <i className="fas fa-home text-lg w-6 text-center"></i> Home
            </button>
            <div className="border-t border-gray-200 my-2 pt-2">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Categories</h3>
              {CATEGORIES_LIST.filter(c => c.type !== WorkerCategory.ALL).map(cat => (
                <button
                  key={cat.name}
                  onClick={() => {
                    onChangeView('home');
                    onCategoryChange(cat.type);
                  }}
                  className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${activeCategory === cat.type ? 'bg-green-50 text-green-700 font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <i className={`fas ${cat.icon} text-lg w-6 text-center`}></i> {cat.name}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-200 my-2 pt-2">
               <button 
                onClick={() => onChangeView('products')}
                className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${currentView === 'products' ? 'bg-gray-100 font-bold text-black' : 'hover:bg-gray-100 text-gray-700'}`}
               >
                 <i className="fas fa-shopping-cart text-lg w-6 text-center"></i> Products
               </button>
               <button 
                onClick={() => onChangeView('others')}
                className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${currentView === 'others' ? 'bg-gray-100 font-bold text-black' : 'hover:bg-gray-100 text-gray-700'}`}
               >
                 <i className="fas fa-ellipsis-h text-lg w-6 text-center"></i> Others
               </button>
               <button 
                onClick={() => onChangeView('about')}
                className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${currentView === 'about' ? 'bg-gray-100 font-bold text-black' : 'hover:bg-gray-100 text-gray-700'}`}
               >
                 <i className="fas fa-info-circle text-lg w-6 text-center"></i> About App
               </button>
            </div>
          </div>
          
          <div className="mt-auto p-4 text-xs text-gray-500">
             <p>© 2025 SkilledHelpers</p>
             <p>No Poverty Initiative</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] bg-gray-50 pb-20 md:pb-0 relative">
          {children}
          
          {/* Mobile Floating Action Button for AI */}
          <button 
             onClick={onOpenAI}
             className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white shadow-xl flex items-center justify-center z-30 animate-bounce-slow"
          >
             <i className="fas fa-magic text-2xl"></i>
          </button>
        </main>
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex justify-around items-center z-40 pb-safe">
         <button 
           onClick={() => { onChangeView('home'); onCategoryChange(WorkerCategory.ALL); }}
           className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-green-600' : 'text-gray-500'}`}
         >
           <i className="fas fa-home text-lg"></i>
           <span className="text-[10px]">Home</span>
         </button>

         <button 
            onClick={() => onChangeView('products')}
            className={`flex flex-col items-center gap-1 ${currentView === 'products' ? 'text-green-600' : 'text-gray-500'}`}
         >
            <i className="fas fa-shopping-cart text-lg"></i>
            <span className="text-[10px]">Products</span>
         </button>

         <button 
            onClick={onOpenAdd}
            className={`flex flex-col items-center gap-1 text-black`}
         >
            <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mb-[-2px]">
              <i className="fas fa-plus text-sm"></i>
            </div>
            <span className="text-[10px] font-bold">Add</span>
         </button>

         <button 
            onClick={() => onChangeView('others')}
            className={`flex flex-col items-center gap-1 ${currentView === 'others' ? 'text-green-600' : 'text-gray-500'}`}
         >
            <i className="fas fa-ellipsis-h text-lg"></i>
            <span className="text-[10px]">Others</span>
         </button>

         <button 
            onClick={() => onChangeView('about')}
            className={`flex flex-col items-center gap-1 ${currentView === 'about' ? 'text-green-600' : 'text-gray-500'}`}
         >
            <i className="fas fa-info-circle text-lg"></i>
            <span className="text-[10px]">About</span>
         </button>
      </div>
    </div>
  );
};

export default Layout;