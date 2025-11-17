import React, { useMemo } from 'react';
import type { Product } from '../../types';

interface StockStatusChartProps {
  products: Product[];
}

const StockStatusChart: React.FC<StockStatusChartProps> = ({ products }) => {
  const statusCounts = useMemo(() => {
    const counts = { ok: 0, warning: 0, low: 0 };
    products.forEach(p => {
      if (p.reorderLevel <= 0) {
        counts.ok++;
        return;
      }
      const statusRatio = p.stock / p.reorderLevel;
      if (statusRatio < 1) {
        counts.low++;
      } else if (statusRatio <= 1.2) {
        counts.warning++;
      } else {
        counts.ok++;
      }
    });
    return counts;
  }, [products]);

  const totalProducts = products.length;
  if (totalProducts === 0) {
    return <div className="flex items-center justify-center h-full text-stone-500">Sem dados de insumos.</div>;
  }
  
  const chartData = [
    { label: 'Estoque OK', value: statusCounts.ok, percentage: (statusCounts.ok / totalProducts) * 100, colorClass: 'bg-green-500' },
    { label: 'Atenção', value: statusCounts.warning, percentage: (statusCounts.warning / totalProducts) * 100, colorClass: 'bg-amber-500' },
    { label: 'Estoque Baixo', value: statusCounts.low, percentage: (statusCounts.low / totalProducts) * 100, colorClass: 'bg-red-500' },
  ];

  return (
    <div className="space-y-5 pt-4 h-full flex flex-col justify-center">
      {chartData.map(data => (
        <div key={data.label}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-stone-600">{data.label}</span>
            <span className="text-sm font-semibold text-stone-800">{data.value} {data.value === 1 ? 'insumo' : 'insumos'}</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2.5" role="progressbar" aria-valuenow={data.value} aria-valuemin={0} aria-valuemax={totalProducts} aria-label={`${data.label}: ${data.value} de ${totalProducts} insumos`}>
            <div
              className={`${data.colorClass} h-2.5 rounded-full transition-all duration-500`}
              style={{ width: `${data.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockStatusChart;