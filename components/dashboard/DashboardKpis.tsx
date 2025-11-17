import React, { useMemo } from 'react';
import type { Product, AdjustmentLog } from '../../types';

interface DashboardKpisProps {
  products: Product[];
  adjustmentHistory: AdjustmentLog[];
  filterDate: Date;
}

const DollarSignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
);
const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
);
const LayersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
);
const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);


const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; tooltip?: string }> = ({ title, value, icon, color, tooltip }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm flex items-center space-x-4 relative group">
    <div className={`p-3 rounded-lg ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-stone-500">{title}</p>
      <p className="text-2xl font-bold text-stone-800">{value}</p>
    </div>
    {tooltip && (
      <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-stone-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {tooltip}
      </div>
    )}
  </div>
);

const DashboardKpis: React.FC<DashboardKpisProps> = ({ products, adjustmentHistory, filterDate }) => {
  const kpis = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + p.stock * p.averageCost, 0);
    const attentionItems = products.filter(p => p.stock < p.reorderLevel * 1.2).length;
    const productVarieties = products.length;

    const monthlyInvestment = adjustmentHistory
      .filter(log => log.type === 'add' && log.totalPurchaseCost)
      .reduce((sum, log) => sum + (log.totalPurchaseCost || 0), 0);

    return { totalValue, attentionItems, productVarieties, monthlyInvestment };
  }, [products, adjustmentHistory]);
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  
  const investmentLabel = `Investido (${filterDate.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}/${filterDate.getFullYear().toString().slice(2)})`;


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Valor Total do Estoque"
        value={formatCurrency(kpis.totalValue)}
        icon={<DollarSignIcon className="h-6 w-6 text-green-800" />}
        color="bg-green-100"
      />
      <StatCard
        title="Itens em Atenção"
        value={kpis.attentionItems}
        icon={<AlertTriangleIcon className="h-6 w-6 text-amber-800" />}
        color="bg-amber-100"
        tooltip="Itens com estoque baixo ou próximo do nível de recompra."
      />
      <StatCard
        title={investmentLabel}
        value={formatCurrency(kpis.monthlyInvestment)}
        icon={<ShoppingCartIcon className="h-6 w-6 text-blue-800" />}
        color="bg-blue-100"
      />
      <StatCard
        title="Variedade de Insumos"
        value={kpis.productVarieties}
        icon={<LayersIcon className="h-6 w-6 text-indigo-800" />}
        color="bg-indigo-100"
      />
    </div>
  );
};

export default DashboardKpis;
