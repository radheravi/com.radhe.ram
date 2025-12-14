import React, { useState, useEffect } from 'react';
import { ActivityType, AppState, LogEntry } from './types';
import { MOCK_LOGS, FEATURES } from './constants';
import { AdSpace } from './components/AdSpace';
import { generateSafetyInsight } from './services/geminiService';
import { 
  Phone, 
  MessageSquare, 
  Bell, 
  MapPin, 
  Shield, 
  Activity, 
  Download, 
  Menu, 
  X,
  Smartphone,
  CheckCircle,
  BrainCircuit,
  AlertTriangle
} from 'lucide-react';

// --- Icons Mapping ---
const getIcon = (type: ActivityType) => {
  switch (type) {
    case ActivityType.CALL: return <Phone size={18} className="text-green-600" />;
    case ActivityType.SMS: return <MessageSquare size={18} className="text-blue-600" />;
    case ActivityType.NOTIFICATION: return <Bell size={18} className="text-orange-500" />;
    case ActivityType.LOCATION: return <MapPin size={18} className="text-red-600" />;
    default: return <Activity size={18} />;
  }
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentPage: 'landing',
    currentView: 'overview',
    isAiThinking: false,
    aiInsight: null
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Handlers ---
  const handleNav = (page: 'landing' | 'dashboard') => {
    setState(prev => ({ ...prev, currentPage: page }));
    setMobileMenuOpen(false);
  };

  const handleViewChange = (view: AppState['currentView']) => {
    setState(prev => ({ ...prev, currentView: view }));
    setMobileMenuOpen(false);
  };

  const handleAiCheck = async () => {
    setState(prev => ({ ...prev, isAiThinking: true }));
    const insight = await generateSafetyInsight(MOCK_LOGS);
    setState(prev => ({ ...prev, isAiThinking: false, aiInsight: insight }));
  };

  // --- Filter Logs based on View ---
  const getFilteredLogs = () => {
    if (state.currentView === 'overview') return MOCK_LOGS;
    if (state.currentView === 'calls') return MOCK_LOGS.filter(l => l.type === ActivityType.CALL);
    if (state.currentView === 'sms') return MOCK_LOGS.filter(l => l.type === ActivityType.SMS);
    if (state.currentView === 'notifications') return MOCK_LOGS.filter(l => l.type === ActivityType.NOTIFICATION);
    if (state.currentView === 'location') return MOCK_LOGS.filter(l => l.type === ActivityType.LOCATION);
    return MOCK_LOGS;
  };

  const filteredLogs = getFilteredLogs();

  // --- Landing Page Component ---
  if (state.currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                   <Shield className="text-white h-6 w-6" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Radhe Control
                </span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
                <a href="#download" className="text-gray-600 hover:text-indigo-600 transition">Download</a>
                <button 
                  onClick={() => handleNav('dashboard')}
                  className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                >
                  Open Dashboard
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
              Keep your child <span className="text-indigo-600">Ravi</span> safe with <span className="text-indigo-600">Radhe</span>.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 mb-10">
              The ultimate parental control solution. Monitor Calls, SMS, Notifications, and Location in real-time. Secure, private, and reliable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => handleNav('dashboard')} 
                className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-xl shadow-indigo-200"
              >
                <Activity size={20} /> Live Demo
              </button>
              <a href="#download" className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition">
                <Download size={20} /> Download Apps
              </a>
            </div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </header>

        {/* Ad Section (Banner) */}
        <div className="max-w-4xl mx-auto w-full px-4 mb-16">
           <AdSpace type="banner" className="rounded-xl shadow-sm" />
        </div>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Everything you need</h2>
              <p className="mt-4 text-slate-500">Powerful tools to ensure digital wellbeing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-20 bg-indigo-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Get Started in Minutes</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              
              {/* Parent App Card */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 max-w-sm w-full hover:bg-white/15 transition">
                <Smartphone size={48} className="mx-auto mb-4 text-green-400" />
                <h3 className="text-2xl font-bold mb-2">Radhe (Parent)</h3>
                <p className="text-indigo-200 mb-6">Install this on your phone to view data.</p>
                <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  <Download size={18} /> Download APK
                </button>
              </div>

              <div className="hidden md:block text-2xl font-bold opacity-50">→</div>

              {/* Child App Card */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 max-w-sm w-full hover:bg-white/15 transition">
                <Smartphone size={48} className="mx-auto mb-4 text-pink-400" />
                <h3 className="text-2xl font-bold mb-2">Ravi (Child)</h3>
                <p className="text-indigo-200 mb-6">Install this on the child's device.</p>
                <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  <Download size={18} /> Download APK
                </button>
              </div>

            </div>
            <p className="mt-8 text-sm text-indigo-300 opacity-80">*Requires Android 8.0+. Permissions needed: SMS, Call Logs, Location.</p>
          </div>
        </section>

        <footer className="bg-slate-900 py-12 text-slate-400 text-center">
          <p>© 2024 Radhe Parental Control. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // --- Dashboard Component ---
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white z-50 px-4 h-16 flex items-center justify-between border-b shadow-sm">
        <div className="flex items-center gap-2 font-bold text-indigo-600">
          <Shield /> Radhe
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
             <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl">
               <Shield className="fill-current" /> Radhe
             </div>
          </div>

          <div className="p-4">
             <div className="bg-indigo-50 p-4 rounded-xl flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">R</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ravi's Phone</h4>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                  </div>
                </div>
             </div>

             <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Dashboard', icon: <Activity size={20} /> },
                  { id: 'calls', label: 'Call Logs', icon: <Phone size={20} /> },
                  { id: 'sms', label: 'Messages', icon: <MessageSquare size={20} /> },
                  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
                  { id: 'location', label: 'Live Location', icon: <MapPin size={20} /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleViewChange(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      state.currentView === item.id 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
             </nav>
          </div>

          <div className="mt-auto p-4 border-t border-gray-100">
            <button onClick={() => handleNav('landing')} className="text-gray-500 hover:text-red-500 text-sm flex items-center gap-2">
               Log Out
            </button>
          </div>
          
          <div className="p-4">
            <AdSpace />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:pt-0 pt-16">
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{state.currentView}</h1>
          <div className="flex gap-3">
             <button onClick={handleAiCheck} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
               <BrainCircuit size={18} />
               Radhe AI Analysis
             </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          
          {/* AI Insight Box */}
          {state.aiInsight && (
             <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500 animate-fade-in-up">
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                   <BrainCircuit size={24} />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-1">Radhe AI Safety Report</h3>
                   <p className="text-gray-600 leading-relaxed">{state.aiInsight}</p>
                 </div>
               </div>
             </div>
          )}

          {state.isAiThinking && (
             <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm animate-pulse">
               <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
               <div className="h-4 bg-gray-200 rounded w-3/4"></div>
             </div>
          )}

          {/* Ad Banner */}
          <AdSpace type="banner" className="mb-8 rounded-xl h-24" />

          {/* Dashboard Stats (Overview Only) */}
          {state.currentView === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-green-100 text-green-600 rounded-xl"><Phone size={24}/></div>
                   <span className="text-xs font-bold text-gray-400">TODAY</span>
                 </div>
                 <h3 className="text-3xl font-bold text-gray-900">12</h3>
                 <p className="text-gray-500 text-sm">Calls Received</p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><MessageSquare size={24}/></div>
                   <span className="text-xs font-bold text-gray-400">TODAY</span>
                 </div>
                 <h3 className="text-3xl font-bold text-gray-900">45</h3>
                 <p className="text-gray-500 text-sm">Messages</p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-red-100 text-red-600 rounded-xl"><MapPin size={24}/></div>
                   <span className="text-xs font-bold text-gray-400">NOW</span>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 truncate">Delhi Public School</h3>
                 <p className="text-gray-500 text-sm">Last Location</p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><Bell size={24}/></div>
                   <span className="text-xs font-bold text-gray-400">PENDING</span>
                 </div>
                 <h3 className="text-3xl font-bold text-gray-900">3</h3>
                 <p className="text-gray-500 text-sm">Alerts</p>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Log List */}
            <div className="lg:col-span-2 space-y-4">
              {state.currentView === 'location' ? (
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-slate-200">
                    {/* Simulated Map Background Pattern */}
                    <div className="w-full h-full opacity-10" style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                  </div>
                  <div className="z-10 bg-white p-4 rounded-full shadow-2xl animate-bounce">
                    <div className="bg-indigo-600 p-2 rounded-full border-4 border-white">
                      <MapPin className="text-white" />
                    </div>
                  </div>
                  <p className="z-10 mt-4 font-bold text-gray-600 bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm">
                    Connaught Place, New Delhi
                  </p>
                  <p className="z-10 text-xs text-gray-500 mt-1">Updated: 2 mins ago</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-700">Recent Activity Log</h3>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Live Data</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {filteredLogs.length === 0 ? (
                      <div className="p-8 text-center text-gray-400">No logs found for this category.</div>
                    ) : (
                      filteredLogs.map((log) => (
                        <div key={log.id} className="p-4 hover:bg-gray-50 transition flex items-start gap-4">
                          <div className={`p-3 rounded-full shrink-0 ${
                            log.type === ActivityType.CALL ? 'bg-green-100' : 
                            log.type === ActivityType.SMS ? 'bg-blue-100' :
                            log.type === ActivityType.LOCATION ? 'bg-red-100' : 'bg-orange-100'
                          }`}>
                            {getIcon(log.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start">
                               <h4 className="font-semibold text-gray-900 truncate">{log.title}</h4>
                               <span className="text-xs text-gray-400 whitespace-nowrap">{log.timestamp}</span>
                             </div>
                             <p className="text-sm text-gray-500 mt-1 truncate">{log.description}</p>
                             {log.status === 'missed' && <span className="text-xs text-red-500 font-medium mt-1 inline-block">Missed Call</span>}
                             {log.title === 'SERVICE-ALERT' && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded ml-auto mt-2 inline-block">Spam?</span>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Widgets (Ads & status) */}
            <div className="space-y-6">
               <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><CheckCircle size={20} className="text-green-400"/> Device Status</h3>
                  <div className="space-y-4 mt-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1 opacity-80">
                        <span>Battery</span>
                        <span>78%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 w-[78%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1 opacity-80">
                        <span>Signal</span>
                        <span>4G LTE</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-400 w-[90%]"></div>
                      </div>
                    </div>
                  </div>
               </div>

               <AdSpace className="h-64 rounded-2xl" />
               
               <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                 <div className="flex gap-3">
                   <AlertTriangle className="text-yellow-600 shrink-0" />
                   <div>
                     <h4 className="font-bold text-yellow-800 text-sm">Upgrade to Premium</h4>
                     <p className="text-xs text-yellow-700 mt-1">Get unlimited history and remove ads.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;