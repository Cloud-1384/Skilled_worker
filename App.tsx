import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import WorkerCard from './WorkerCard';
import DiagnoseModal from './DiagnoseModal';
import AddDataModal from './components/AddDataModal';
import { MOCK_WORKERS, MOCK_PRODUCTS, CATEGORIES_LIST, APP_NAME, TAGLINE } from './constants';
import { WorkerCategory, WorkerProfile, Product } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<WorkerCategory>(WorkerCategory.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State initialization with LocalStorage check - UPDATED KEY TO v1 TO FORCE REFRESH
  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem('skilledHelpers_workers_v1');
    return saved ? JSON.parse(saved) : MOCK_WORKERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('skilledHelpers_products_v1');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'products' | 'others'>('home');
  const [filteredWorkers, setFilteredWorkers] = useState<WorkerProfile[]>(workers);

  // Save to LocalStorage whenever data changes - UPDATED KEY TO v1
  useEffect(() => {
    localStorage.setItem('skilledHelpers_workers_v1', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('skilledHelpers_products_v1', JSON.stringify(products));
  }, [products]);

  // Filter logic
  useEffect(() => {
    let filtered = workers;

    if (activeCategory !== WorkerCategory.ALL) {
      filtered = filtered.filter(w => w.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(w => 
        w.name.toLowerCase().includes(q) || 
        w.services.some(s => s.toLowerCase().includes(q)) ||
        w.description.toLowerCase().includes(q)
      );
    }

    setFilteredWorkers(filtered);
  }, [activeCategory, searchQuery, workers]);

  const handleAddWorker = (newWorker: WorkerProfile) => {
    setWorkers(prev => [newWorker, ...prev]);
    setActiveCategory(WorkerCategory.ALL);
    setCurrentView('home');
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setCurrentView('products');
  };

  const renderHome = () => (
    <div className="animate-fade-in-up space-y-8">
      {/* Hero / Banner for Categories (Only on All) */}
      {activeCategory === WorkerCategory.ALL && !searchQuery && (
         <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-green-900/20 relative overflow-hidden group min-h-[300px] flex items-center">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
                Community Driven Platform
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-sm leading-tight tracking-tight">
                {TAGLINE}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl leading-relaxed text-green-50">
                Connect with skilled local professionals. We ensure fair wages, quality work, and stronger communities for everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsAIModalOpen(true)}
                  className="bg-white text-green-700 font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-green-50 hover:-translate-y-1 transition-all flex items-center gap-2 group/btn"
                >
                   <i className="fas fa-robot text-orange-500 text-lg group-hover/btn:rotate-12 transition-transform"></i> 
                   <span>Ask AI Helper</span>
                </button>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-black/30 backdrop-blur-md border border-white/30 text-white font-bold py-3.5 px-8 rounded-full hover:bg-black/40 hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                   <i className="fas fa-plus"></i> 
                   <span>List Your Service</span>
                </button>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3 animate-pulse-slow blur-3xl"></div>
            <div className="absolute bottom-0 right-20 w-64 h-64 bg-teal-400 opacity-10 rounded-full transform translate-y-1/2 animate-float blur-2xl"></div>
            <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2">
               <i className="fas fa-hard-hat text-[200px] text-white opacity-10 transform rotate-12"></i>
            </div>
         </div>
      )}

      {/* Category Pills (Mobile/Tablet scrolling) */}
      <div className="flex overflow-x-auto gap-3 pb-2 md:hidden no-scrollbar">
        {CATEGORIES_LIST.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.type)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border shadow-sm flex-shrink-0 ${
              activeCategory === cat.type 
              ? 'bg-black text-white border-black shadow-md' 
              : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Workers Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {activeCategory === WorkerCategory.ALL ? (
              <><i className="fas fa-star text-yellow-500"></i> Top Rated Professionals</>
            ) : (
              <><div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"><i className="fas fa-filter text-sm"></i></div> {activeCategory}s</>
            )}
          </h2>
          {searchQuery && <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">Results for "{searchQuery}"</span>}
        </div>
        
        {filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkers.map((worker, idx) => (
              <div key={worker.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <WorkerCard worker={worker} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200 animate-fade-in-up">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
               <i className="fas fa-search text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No professionals found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">It looks quiet here. Try adjusting your search terms or selecting a different category.</p>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Add Professional
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="animate-fade-in-up space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider mb-3">Marketplace</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Tools & Safety Gear</h1>
          <p className="text-blue-100 text-lg max-w-xl">High-quality equipment for professionals and DIY enthusiasts. Verified sellers only.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="relative z-10 bg-white text-blue-700 px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all">
           + Sell Product
        </button>
        <i className="fas fa-shopping-cart text-9xl absolute -right-10 -bottom-10 text-blue-500 opacity-50 transform -rotate-12"></i>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col group animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
               <div className="h-56 overflow-hidden bg-gray-100 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-bold text-gray-900 shadow-sm">
                    ₹{product.price}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105">
                        Quick View
                     </button>
                  </div>
               </div>
               <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                     <div className="flex items-center text-yellow-500 text-xs bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                        <i className="fas fa-star mr-1"></i>{product.rating}
                     </div>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {product.category}
                  </p>
                  <button className="w-full mt-auto bg-gray-50 hover:bg-gray-900 text-gray-800 hover:text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-gray-100 hover:border-gray-900">
                    <i className="fas fa-shopping-cart group-hover/btn:scale-110 transition-transform"></i> Buy Now
                  </button>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-blue-200 animate-fade-in-up">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-300">
             <i className="fas fa-box-open text-3xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Shelf is empty</h3>
          <p className="text-gray-400 mb-6">No products available at the moment.</p>
          <button onClick={() => setIsAddModalOpen(true)} className="text-blue-600 font-bold hover:underline hover:text-blue-800 transition-colors">
            Add a product now
          </button>
        </div>
      )}
    </div>
  );

  const renderOthers = () => (
    <div className="max-w-5xl mx-auto animate-fade-in-up space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Resources</h1>
        <p className="text-gray-500">Everything you need to grow and connect.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center gap-6 cursor-pointer hover:shadow-xl hover:border-blue-200 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 relative z-10 shadow-sm">
             <i className="fas fa-plus"></i>
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">Add Listing</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Register a professional service or list a new product.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl text-white shadow-xl flex items-center justify-between relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform">
           <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Join the Community</h3>
              <p className="opacity-90 text-sm max-w-xs leading-relaxed">Connect with other helpers and homeowners on our Discord server.</p>
           </div>
           <i className="fab fa-discord text-5xl opacity-80 group-hover:scale-110 transition-transform z-10"></i>
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
       
       <div className="text-center mb-16">
          <div className="inline-block p-4 rounded-3xl bg-white shadow-xl shadow-green-100 mb-8 transform hover:scale-105 transition-transform duration-500">
             <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white text-5xl">
                <i className="fas fa-hands-helping"></i>
             </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">{APP_NAME}</h1>
          <p className="text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            "{TAGLINE}"
          </p>
       </div>
       
       <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 text-sm"><i className="fas fa-users"></i></span>
              Who We Are
            </h2>
            <p className="text-gray-600 leading-loose">
              We, <strong className="text-gray-900">Shruthika, Akshaya, and Advitha</strong>, are dedicated to helping people connect with skilled workers—such as plumbers, electricians, carpenters, and more—at affordable prices. Our platform makes it easy to find reliable professionals who can fix, build, or repair anything you need.
            </p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-sm"><i className="fas fa-bullseye"></i></span>
              Our Mission
            </h2>
            <p className="text-gray-600 leading-loose">
              We aim to support the <strong className="text-blue-600">“No Poverty”</strong> goal. We empower workers with better visibility and income opportunities, while offering the community trustworthy, budget-friendly services. It's a win-win ecosystem for everyone.
            </p>
          </div>
       </div>

       <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="text-gray-400 text-lg">We'd love to hear from you. Scan the QR code or reach out directly.</p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><i className="fas fa-phone"></i></div>
                    <span className="font-mono text-lg">+1 (800) SKILLED-HELP</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><i className="fas fa-envelope"></i></div>
                    <span>support@skilledhelpers.org</span>
                  </div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
               <img 
                 src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://skilledhelpers.org" 
                 alt="QR Code" 
                 className="w-40 h-40 mix-blend-multiply"
               />
            </div>
          </div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
       </div>
    </div>
  );

  // Simple router switch
  let content;
  switch (currentView) {
    case 'home': content = renderHome(); break;
    case 'products': content = renderProducts(); break;
    case 'others': content = renderOthers(); break;
    case 'about': content = renderAbout(); break;
    default: content = renderHome();
  }

  return (
    <div className="text-gray-900">
      <Layout 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory}
        onSearch={(query) => {
            setSearchQuery(query);
            if (query.trim()) {
                setActiveCategory(WorkerCategory.ALL); // Reset category on search to find all results
                setCurrentView('home');
            }
        }}
        onOpenAI={() => setIsAIModalOpen(true)}
        onOpenAdd={() => setIsAddModalOpen(true)}
        currentView={currentView}
        onChangeView={setCurrentView}
      >
        {content}
      </Layout>

      <DiagnoseModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onCategorySelect={(cat) => {
            setActiveCategory(cat as WorkerCategory);
            setCurrentView('home');
        }}
      />

      <AddDataModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWorker={handleAddWorker}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default App;