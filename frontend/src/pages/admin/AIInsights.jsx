import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { api } from '../../api/api';
import { 
  Sparkles, 
  TrendingUp, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Package, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const AdminAIInsights = () => {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setLoading(true);
    const data = await api.ai.getInsights();
    setAiData(data);
    setLoading(false);
  };

  if (loading || !aiData) {
    return (
      <div className="flex min-h-screen bg-cream-paper">
        <AdminSidebar />
        <main className="grow p-12 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-fresh-grass border-t-transparent rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-cream-paper">
      <AdminSidebar />

      <main className="grow p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline-mist">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-sky-pop" />
              <span className="text-xs font-bold text-sky-pop uppercase tracking-wider">AI Operations Intelligence</span>
            </div>
            <h1 className="text-3xl font-black text-ink-black tracking-tight">AI Insights & Predictive Analytics</h1>
            <p className="text-xs text-stone-gray font-medium mt-1">
              Automated demand forecasting and unit-level predictive maintenance risk scoring.
            </p>
          </div>

          <Button variant="outline" size="sm" icon={RefreshCw} onClick={loadInsights}>
            Re-run Predictive Models
          </Button>
        </div>

        {/* Section 1: Demand Forecasting Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-ink-black flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-fresh-grass" />
              <span>1. Inventory Demand Forecasting</span>
            </h2>
            <span className="text-xs font-bold text-stone-gray">Model Confidence: 94.2%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiData.demandForecasts.map((item, idx) => {
              const isHigh = item.riskLevel === 'HIGH' || item.riskLevel === 'CRITICAL';
              return (
                <Card key={idx} className="space-y-4 relative overflow-hidden border-2 border-hairline-mist">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-gray uppercase tracking-wider block">Predicted Demand</span>
                      <h3 className="text-base font-bold text-ink-black mt-0.5">{item.productName}</h3>
                    </div>
                    <Badge status={item.riskLevel} size="sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 bg-sandstone/30 rounded-2xl border border-hairline-mist text-center text-xs">
                    <div>
                      <span className="text-stone-gray block">Current Stock</span>
                      <span className="text-base font-black text-ink-black">{item.currentStock} Units</span>
                    </div>
                    <div>
                      <span className="text-stone-gray block">Predicted Demand</span>
                      <span className="text-base font-black text-fresh-grass">{item.predictedDemand} Units</span>
                    </div>
                  </div>

                  <div className="p-3 bg-sky-pop/10 rounded-2xl border border-sky-pop/20 space-y-1">
                    <span className="text-[11px] font-bold text-sky-pop uppercase block flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Recommendation
                    </span>
                    <p className="text-xs text-ink-black font-medium leading-relaxed">
                      {item.recommendation}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Section 2: Predictive Maintenance Risk */}
        <div className="space-y-4 pt-6 border-t border-hairline-mist">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-ink-black flex items-center gap-2">
              <Wrench className="w-5 h-5 text-coral-pop" />
              <span>2. Predictive Maintenance & Unit Health</span>
            </h2>
            <span className="text-xs font-bold text-stone-gray">Unit Telemetry Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiData.predictiveMaintenance.map((unit, idx) => (
              <Card key={idx} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-gray">{unit.unitSerial}</span>
                    <h3 className="text-base font-bold text-ink-black">{unit.productName}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-stone-gray block">Maintenance Risk</span>
                    <span className={`text-xl font-black ${unit.maintenanceRisk > 70 ? 'text-coral-pop' : 'text-fresh-grass'}`}>
                      {unit.maintenanceRisk}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 bg-sandstone/30 rounded-2xl border border-hairline-mist text-center text-xs">
                  <div>
                    <span className="text-stone-gray block">Total Rentals</span>
                    <span className="font-bold text-ink-black">{unit.rentalCount}</span>
                  </div>
                  <div>
                    <span className="text-stone-gray block">Hours Used</span>
                    <span className="font-bold text-ink-black">{unit.hoursUsed} hrs</span>
                  </div>
                  <div>
                    <span className="text-stone-gray block">Damage Logs</span>
                    <span className="font-bold text-ink-black">{unit.damageHistoryCount}</span>
                  </div>
                </div>

                <div className="p-3 bg-cream-paper rounded-2xl border border-hairline-mist text-xs text-ink-black font-medium leading-relaxed flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-stone-gray shrink-0 mt-0.5" />
                  <span>{unit.recommendation}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
