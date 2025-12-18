
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { MapPin, Users, Wallet, Leaf, Flame, Utensils, Package, ChevronRight, CheckCircle2, Circle, RefreshCcw, Wifi, WifiOff, Calendar, Camera } from 'lucide-react';
import Countdown from './components/Countdown';
import StatsCard from './components/StatsCard';
import { mockMembers, mockFood, mockItems } from './services/mockData';
import { fetchMembers, fetchFood, fetchItems } from './services/sheetService';
import { PICNIC_LOCATION_URL, PICNIC_SPOT_NAME, FEES_PER_MEMBER, SHEET_URLS } from './constants';
import { Member, FoodItem, InventoryItem } from './types';

type TabType = 'members' | 'collection' | 'food' | 'items';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('members');
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [food, setFood] = useState<FoodItem[]>(mockFood);
  const [items, setItems] = useState<InventoryItem[]>(mockItems);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLive, setIsLive] = useState(false);
  
  const tabsRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async (isFirstLoad: boolean = false) => {
    if (!SHEET_URLS.MEMBERS) return;
    
    if (isFirstLoad) setIsInitialLoading(true);
    setIsRefreshing(true);

    try {
      const [fetchedMembers, fetchedFood, fetchedItems] = await Promise.all([
        fetchMembers(SHEET_URLS.MEMBERS),
        fetchFood(SHEET_URLS.FOOD || SHEET_URLS.MEMBERS),
        fetchItems(SHEET_URLS.ITEMS || SHEET_URLS.MEMBERS)
      ]);
      
      setMembers(fetchedMembers);
      setFood(fetchedFood);
      setItems(fetchedItems);
      setIsLive(true);
    } catch (error) {
      console.error("Failed to sync with cloud. Check Sheet permissions or URL.", error);
      setIsLive(false);
    } finally {
      setIsInitialLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData(true);
    const interval = setInterval(() => {
      loadData(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [loadData]);

  const stats = useMemo(() => {
    const vegCount = members.filter(m => m.preference === 'Veg').length;
    const nonVegCount = members.filter(m => m.preference === 'Non-Veg').length;
    const totalCollected = members.reduce((sum, m) => sum + m.amountPaid, 0);
    const expectedTotal = FEES_PER_MEMBER ? members.length * FEES_PER_MEMBER : null;

    return {
      totalMembers: members.length,
      vegCount,
      nonVegCount,
      totalCollected,
      expectedTotal,
      feesPerMember: FEES_PER_MEMBER
    };
  }, [members]);

  const scrollToTabs = (tab: TabType) => {
    setActiveTab(tab);
    if (tabsRef.current) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = tabsRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'members':
        return (
          <div className="space-y-3 px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {members.map((member) => (
              <div key={member.id} className="cred-card p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${member.preference === 'Veg' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <div>
                    <div className="font-bold text-zinc-900">{member.name}</div>
                    <div className="text-[10px] text-zinc-400 uppercase font-black tracking-tight">{member.preference}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-200" />
              </div>
            ))}
          </div>
        );
      case 'collection':
        return (
          <div className="space-y-3 px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {members.map((member) => (
              <div key={member.id} className="cred-card p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-zinc-900">{member.name}</div>
                  <div className="text-[10px] uppercase font-black tracking-tight">
                    {stats.feesPerMember && member.amountPaid >= stats.feesPerMember 
                      ? <span className="text-emerald-500">FULLY PAID</span> 
                      : <span className="text-amber-500">PAID: ₹{member.amountPaid}</span>}
                  </div>
                </div>
                <div className={`text-lg font-mono font-black ${stats.feesPerMember && member.amountPaid >= stats.feesPerMember ? 'text-zinc-900' : 'text-zinc-400'}`}>
                  ₹{member.amountPaid}
                </div>
              </div>
            ))}
          </div>
        );
      case 'food':
        return (
          <div className="space-y-3 px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {food.map((item) => (
              <div key={item.id} className="cred-card p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl bg-zinc-50 border border-zinc-100`}>
                    <Utensils className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900">{item.name}</div>
                    <div className="text-[10px] text-zinc-400 uppercase font-black tracking-tight">{item.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'items':
        return (
          <div className="space-y-3 px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {items.map((item) => (
              <div key={item.id} className="cred-card p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.isArranged ? (
                    <CheckCircle2 className="w-5 h-5 text-zinc-900" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-100" />
                  )}
                  <div className="font-bold text-zinc-900">{item.name}</div>
                </div>
                <div className={`text-[10px] font-black uppercase ${item.isArranged ? 'text-zinc-900' : 'text-zinc-300'}`}>
                  {item.isArranged ? 'ARRANGED' : 'PENDING'}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 text-zinc-900">
      {/* Navbar */}
      <nav className="glass-nav fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-extrabold tracking-tight flex items-center gap-2">
            Sonamuni <span className="text-zinc-400">Picnic</span>
            {isRefreshing ? (
               <div className="relative flex items-center justify-center">
                 <RefreshCcw className="w-3 h-3 text-emerald-500 animate-spin absolute" />
                 <Wifi className="w-3 h-3 text-emerald-500 opacity-20" />
               </div>
            ) : isLive ? (
              <Wifi className="w-3 h-3 text-emerald-500 opacity-50" />
            ) : (
              <WifiOff className="w-3 h-3 text-zinc-200" />
            )}
          </h1>
          <p className="text-[8px] text-zinc-400 font-black uppercase tracking-[0.2em] leading-none">Gangs of Salapada</p>
        </div>
        <a 
          href={PICNIC_LOCATION_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-zinc-900 text-white p-2 rounded-full hover:bg-black transition-all active:scale-90 shadow-lg shadow-zinc-200"
        >
          <MapPin size={20} />
        </a>
      </nav>

      <div className="pt-20">
        <Countdown />

        {/* Dashboard Header / Preview */}
        <div className="px-6 mb-8">
          <div className="cred-card p-5 rounded-[2rem] spot-gradient overflow-hidden relative">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                 <MapPin className="w-4 h-4 text-rose-500" />
               </div>
               <span className="text-zinc-400 text-[10px] font-black uppercase tracking-wider">Destination Preview</span>
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-zinc-900 leading-tight mb-2">{PICNIC_SPOT_NAME}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-zinc-100 shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-xs font-bold text-zinc-700">28th Dec, Sunday</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-zinc-100 shadow-sm">
                <Camera className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs font-bold text-zinc-700">Jungle Beach</span>
              </div>
            </div>
            {/* Subtle background icon for "preview" feel */}
            <MapPin className="absolute -bottom-4 -right-4 w-24 h-24 text-zinc-200/20 rotate-12" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-10">
          <StatsCard 
            label="Total Members" 
            value={stats.totalMembers} 
            icon={<Users size={16} />}
            onClick={() => scrollToTabs('members')}
          />
          <StatsCard 
            label="Collection" 
            value={`₹${stats.totalCollected}`} 
            subValue={stats.expectedTotal ? `Target: ₹${stats.expectedTotal}` : "Target: Undecided"}
            color="text-zinc-900"
            icon={<Wallet size={16} />}
            onClick={() => scrollToTabs('collection')}
          />
          <StatsCard 
            label="Veg / Non-Veg" 
            value={`${stats.vegCount} / ${stats.nonVegCount}`} 
            icon={<div className="flex gap-1"><Leaf size={14} className="text-emerald-500"/><Flame size={14} className="text-rose-500"/></div>}
          />
          <StatsCard 
            label="Fee / Member" 
            value={stats.feesPerMember ? `₹${stats.feesPerMember}` : "Undecided"} 
            icon={<Wallet size={16} />}
          />
        </div>

        {/* Tab Switcher */}
        <div ref={tabsRef} className="px-4 sticky top-[72px] z-40 mb-4 py-2 bg-zinc-50/80 backdrop-blur-md border-b border-zinc-100">
          <div className="flex bg-zinc-200/50 p-1.5 rounded-2xl overflow-x-auto no-scrollbar gap-1 border border-zinc-200/30">
            {[
              { id: 'members', label: 'Members', icon: <Users size={14}/> },
              { id: 'collection', label: 'Collection', icon: <Wallet size={14}/> },
              { id: 'food', label: 'Menu', icon: <Utensils size={14}/> },
              { id: 'items', label: 'Items', icon: <Package size={14}/> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 flex-1 min-w-fit whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                  activeTab === tab.id 
                  ? 'bg-white text-zinc-900 shadow-lg shadow-zinc-200/50 border border-zinc-100' 
                  : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-10 min-h-[300px]">
          {isInitialLoading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <RefreshCcw className="w-8 h-8 text-zinc-200 animate-spin" />
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Establishing Connection</span>
             </div>
          ) : (
            renderTable()
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
