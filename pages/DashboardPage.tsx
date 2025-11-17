import React from 'react';
import type { Product, AdjustmentLog } from '../types';
import DashboardKpis from '../components/dashboard/DashboardKpis';
import StockStatusChart from '../components/dashboard/StockStatusChart';
import ValueByProductChart from '../components/dashboard/ValueByProductChart';
import LowStockList from '../components/dashboard/LowStockList';
import RecentActivity from '../components/dashboard/RecentActivity';

interface DashboardPageProps {
  products: Product[];
  adjustmentHistory: AdjustmentLog[];
  onAdjustStock: (product: Product) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ products, adjustmentHistory, onAdjustStock }) => {
  return (
    <div className="space-y-6">
      <DashboardKpis products={products} adjustmentHistory={adjustmentHistory} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-stone-700">Saúde do Estoque</h3>
            <StockStatusChart products={products} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-stone-700">Top 5 Produtos por Valor em Estoque</h3>
            <ValueByProductChart products={products} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-stone-700 p-6">Itens Críticos (Estoque Baixo)</h3>
            <LowStockList products={products} onAdjustStock={onAdjustStock} />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-stone-700 p-6">Atividade Recente</h3>
            <RecentActivity history={adjustmentHistory} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
