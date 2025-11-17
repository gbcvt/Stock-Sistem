import React, { useMemo, useState } from 'react';
import type { Product, AdjustmentLog } from '../types';
import DashboardKpis from '../components/dashboard/DashboardKpis';
import StockStatusChart from '../components/dashboard/StockStatusChart';
import ValueByProductChart from '../components/dashboard/ValueByProductChart';
import LowStockList from '../components/dashboard/LowStockList';
import RecentActivity from '../components/dashboard/RecentActivity';
import DashboardDateFilter from '../components/dashboard/DashboardDateFilter';
import ExpiringSoon from '../components/dashboard/ExpiringSoon';

interface DashboardPageProps {
  products: Product[];
  adjustmentHistory: AdjustmentLog[];
  onAdjustStock: (product: Product) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ products, adjustmentHistory, onAdjustStock }) => {
  const [filterDate, setFilterDate] = useState(new Date());

  const availableYears = useMemo(() => {
    const years = new Set(adjustmentHistory.map(log => new Date(log.date).getFullYear()));
    if (!years.has(new Date().getFullYear())) {
        years.add(new Date().getFullYear());
    }
    return Array.from(years).sort((a: number, b: number) => b - a);
  }, [adjustmentHistory]);

  const filteredHistoryForMonth = useMemo(() => {
    return adjustmentHistory.filter(log => {
      const logDate = new Date(log.date);
      return logDate.getMonth() === filterDate.getMonth() && logDate.getFullYear() === filterDate.getFullYear();
    });
  }, [adjustmentHistory, filterDate]);

  return (
    <div className="space-y-6">
      <DashboardDateFilter
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        availableYears={availableYears}
      />
      <DashboardKpis 
        products={products} 
        adjustmentHistory={filteredHistoryForMonth} 
        filterDate={filterDate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-stone-700">Saúde do Estoque</h3>
            <StockStatusChart products={products} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-stone-700">Top 5 Insumos por Valor em Estoque</h3>
            <ValueByProductChart products={products} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-stone-700 p-6">
              Atividades em {filterDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
            </h3>
            <RecentActivity history={filteredHistoryForMonth} />
        </div>
        <div className="grid grid-rows-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-stone-700 p-6">Itens Críticos</h3>
                <LowStockList products={products} onAdjustStock={onAdjustStock} />
            </div>
             <div className="bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-stone-700 p-6">Validade Próxima</h3>
                <ExpiringSoon adjustmentHistory={adjustmentHistory} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
