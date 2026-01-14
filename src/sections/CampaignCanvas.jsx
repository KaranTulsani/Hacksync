import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { LayoutDashboard, Image, Type, Users, Calendar, Download, RefreshCw, Palette } from 'lucide-react';

const CampaignCanvas = () => {
  return (
    <section className="section-padding bg-alt" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold">Interactive Campaign Canvas</h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            Review, edit, and export your campaign assets in a unified workspace.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-border flex flex-col md:flex-row h-[700px]" 
             style={{ height: '700px', display: 'flex' }}>
          
          {/* Sidebar */}
          <div className="w-64 border-r border-border bg-gray-50/50 p-4 hidden md:flex flex-col gap-2" style={{ width: '260px', backgroundColor: '#f9fafb' }}>
            <div className="px-3 py-4 mb-2">
               <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Campaign</div>
               <div className="font-bold text-lg">Summer Launch</div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-gray-100 cursor-pointer">
                <LayoutDashboard size={18} /> Strategy Brief
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-accent/10 text-accent cursor-pointer" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-accent)' }}>
                <Image size={18} /> Visual Assets
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-gray-100 cursor-pointer">
                <Type size={18} /> Copywriting
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-gray-100 cursor-pointer">
                <Users size={18} /> Influencer Outreach
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-gray-100 cursor-pointer">
                <Calendar size={18} /> Media Plan
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-white">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image size={20} className="text-secondary" /> Visual Assets
              </h3>
              <div className="flex gap-3">
                <Button variant="secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <RefreshCw size={16} className="mr-2" /> Regenerate
                </Button>
                <Button variant="primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  <Download size={16} className="mr-2" /> Export All
                </Button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/30">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50">
                        <Image size={48} opacity={0.2} />
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         <button className="p-2 bg-white rounded-full hover:bg-gray-100"><Download size={16} /></button>
                         <button className="p-2 bg-white rounded-full hover:bg-gray-100"><RefreshCw size={16} /></button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium text-sm">Instagram Post {i}</div>
                        <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-secondary border border-gray-200">1:1</span>
                      </div>
                      <div className="text-xs text-secondary">1080x1080 • PNG</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2 text-secondary uppercase tracking-wider">
                  <Palette size={16} /> Color Palette
                </h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    { color: '#6366f1', name: 'Primary' },
                    { color: '#111827', name: 'Dark' },
                    { color: '#f3f4f6', name: 'Light' },
                    { color: '#ec4899', name: 'Accent' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-2 pr-4 rounded-lg border border-border shadow-sm">
                      <div className="w-10 h-10 rounded-md shadow-inner" style={{ backgroundColor: item.color }}></div>
                      <div className="text-sm">
                        <div className="font-medium">{item.color}</div>
                        <div className="text-xs text-secondary">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignCanvas;
