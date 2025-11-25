import React, { useState } from 'react';
import { CATEGORIES_LIST } from '../constants';
import { WorkerCategory } from '../types';

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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onChangeView('home');
    setIsMobileSearchOpen(false);
  };

  const NavButton: React.FC<{
    active: boolean;
    icon: string;
    label: string;
    onClick: () => void;
  }> = ({ active, icon, label, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-green-50 text-green-700 font-bold shadow-sm' 
          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
        active ? 'bg-white text-green-600' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-gray-700'
      }`}>
        <i className={`fas ${icon} text-sm`}></i>
      </div>
      <span className="text-sm">{label}</span>
      {active && <i className="fas fa-chevron-right ml-auto text-xs opacity-50"></i>}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans text-gray-900 selection:bg-green-100 selection:text-green-800">
      
      {/* Navbar - Desktop & Mobile */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 h-16 sm:h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => { onChangeView('home'); onCategoryChange(WorkerCategory.ALL); setSearchQuery(""); onSearch(""); }}
            >
               <div className="relative w-10 h-10 bg-gradient-to-br from-green-600 to-teal-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform duration-300">
                 <i className="fas fa-hands-helping text-lg"></i>
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-xl tracking-tight leading-none text-gray-900">Skilled<span className="text-green-600">Helpers</span></span>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">Community Platform</span>
               </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full relative group">
                <input
                  type="text"
                  placeholder="What service are you looking for today?"
                  className="w-full bg-gray-100 border-2 border-transparent hover:bg-white hover:border-gray-200 focus:bg-white focus:border-green-500 rounded-2xl py-3 pl-12 pr-14 outline-none transition-all duration-300 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors"></i>
                <button type="submit" className="absolute right-2 top-2 bottom-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm">
                   Search
                </button>
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
               <button 
                 onClick={onOpenAdd}
                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-900 text-white hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg shadow-gray-900/20"
               >
                 <i className="fas fa-plus-circle"></i> Add Listing
               </button>

               <button 
                 onClick={onOpenAI}
                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
               >
                 <i className="fas fa-sparkles"></i> AI Helper
               </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
               <button 
                 className={`p-2.5 rounded-xl transition-colors ${isMobileSearchOpen ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                 onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
               >
                 <i className={`fas ${isMobileSearchOpen ? 'fa-times' : 'fa-search'}`}></i>
               </button>
            </div>
        </div>

        {/* Mobile Search Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-gray-100 ${isMobileSearchOpen ? 'max-h-24 py-3' : 'max-h-0'}`}>
          <form onSubmit={handleSearchSubmit} className="px-4">
             <div className="relative">
                <input
                   type="text"
                   placeholder="Search professionals..."
                   className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500/20 text-sm"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
             </div>
          </form>
        </div>
      </nav>

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full relative">
        
        {/* Desktop Sidebar - Sticky */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-gray-200 bg-white/50 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar self-start rounded-br-3xl">
          <div className="p-6 space-y-8">
            
            {/* Main Navigation */}
            <div className="space-y-1">
               <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Menu</h3>
               <NavButton 
                  active={currentView === 'home' && activeCategory === WorkerCategory.ALL} 
                  icon="fa-home" 
                  label="Home Overview" 
                  onClick={() => { onChangeView('home'); onCategoryChange(WorkerCategory.ALL); setSearchQuery(""); }} 
               />
               <NavButton 
                  active={currentView === 'products'} 
                  icon="fa-shopping-bag" 
                  label="Marketplace" 
                  onClick={() => onChangeView('products')} 
               />
               <NavButton 
                  active={currentView === 'others'} 
                  icon="fa-layer-group" 
                  label="Resources" 
                  onClick={() => onChangeView('others')} 
               />
            </div>

            {/* Categories */}
            <div className="space-y-1">
               <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Find Professionals</h3>
               {CATEGORIES_LIST.filter(c => c.type !== WorkerCategory.ALL).map(cat => (
                 <NavButton 
                    key={cat.name}
                    active={activeCategory === cat.type}
                    icon={cat.icon}
                    label={cat.name}
                    onClick={() => { onChangeView('home'); onCategoryChange(cat.type); }}
                 />
               ))}
            </div>

             {/* Meta */}
            <div className="pt-6 border-t border-gray-100">
               <NavButton 
                  active={currentView === 'about'} 
                  icon="fa-info-circle" 
                  label="About Us" 
                  onClick={() => onChangeView('about')} 
               />
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 flex flex-col">
           <div className="flex-1 p-4 sm:p-6 lg:p-10 pb-24 md:pb-12">
             {children}
           </div>

           {/* Website Footer (Desktop) */}
           <footer className="hidden md:block border-t border-gray-200 bg-white py-12 px-10 mt-auto">
              <div className="grid grid-cols-3 gap-12 mb-8">
                 <div>
                    <div className="flex items-center gap-2 mb-4">
                       <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white"><i className="fas fa-hands-helping"></i></div>
                       <span className="font-bold text-xl">SkilledHelpers</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                       Connecting local talent with community needs. A platform dedicated to the "No Poverty" sustainable development goal.
                    </p>
                    <div className="flex gap-4">
                       <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-600 hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
                       <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"><i className="fab fa-facebook-f"></i></a>
                       <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
                    </div>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                       <li><a href="#" onClick={(e) => { e.preventDefault(); onChangeView('home'); }} className="hover:text-green-600">Find Professionals</a></li>
                       <li><a href="#" onClick={(e) => { e.preventDefault(); onChangeView('products'); }} className="hover:text-green-600">Marketplace</a></li>
                       <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenAdd(); }} className="hover:text-green-600">List Your Service</a></li>
                       <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenAI(); }} className="hover:text-green-600">AI Diagnosis</a></li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                       <li className="flex items-center gap-2"><i className="fas fa-envelope text-gray-400"></i> support@skilledhelpers.org</li>
                       <li className="flex items-center gap-2"><i className="fas fa-phone text-gray-400"></i> +91 98765 43210</li>
                       <li className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-gray-400"></i> Nizamabad, Telangana</li>
                    </ul>
                 </div>
              </div>
              <div className="border-t border-gray-100 pt-8 flex justify-between text-xs text-gray-500">
                 <p>&copy; 2025 SkilledHelpers. All rights reserved.</p>
                 <div className="flex gap-4">
                    <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900">Terms of Service</a>
                 </div>
              </div>
           </footer>
        </main>
      </div>

      {/* Mobile Floating AI Button */}
      <button 
         onClick={onOpenAI}
         className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full text-white shadow-xl shadow-orange-500/30 flex items-center justify-center z-40 animate-pulse-slow active:scale-95 transition-transform"
      >
         <i className="fas fa-magic text-2xl"></i>
      </button>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 pb-safe flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button 
           onClick={() => { onChangeView('home'); onCategoryChange(WorkerCategory.ALL); }}
           className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${currentView === 'home' ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <i className="fas fa-home text-xl"></i>
          <span className="text-[10px]">Home</span>
        </button>

        <button 
           onClick={() => onChangeView('products')}
           className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${currentView === 'products' ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
        >
           <i className="fas fa-shopping-bag text-xl"></i>
           <span className="text-[10px]">Shop</span>
        </button>

        <button 
           onClick={onOpenAdd}
           className="relative -top-6 bg-gray-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-gray-900/40 active:scale-90 transition-transform"
        >
           <i className="fas fa-plus text-xl"></i>
        </button>

        <button 
           onClick={() => onChangeView('others')}
           className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${currentView === 'others' ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
        >
           <i className="fas fa-layer-group text-xl"></i>
           <span className="text-[10px]">Menu</span>
        </button>

        <button 
           onClick={() => onChangeView('about')}
           className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${currentView === 'about' ? 'text-green-600 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
        >
           <i className="fas fa-user text-xl"></i>
           <span className="text-[10px]">About</span>
        </button>
      </div>

    </div>
  );
};

export default Layout;