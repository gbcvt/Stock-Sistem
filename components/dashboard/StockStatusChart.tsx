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
    return <div className="flex items-center justify-center h-full text-stone-500">Sem dados de produtos.</div>;
  }
  
  const percentages = {
    ok: (statusCounts.ok / totalProducts) * 100,
    warning: (statusCounts.warning / totalProducts) * 100,
    low: (statusCounts.low / totalProducts) * 100,
  };

  const circumference = 2 * Math.PI * 40; // 2 * pi * r
  const okOffset = 0;
  const warningOffset = (percentages.ok / 100) * circumference;
  const lowOffset = ((percentages.ok + percentages.warning) / 100) * circumference;

  const chartData = [
    { label: 'Estoque OK', value: statusCounts.ok, percentage: percentages.ok, color: 'text-green-500', stroke: 'stroke-green-500', offset: okOffset },
    { label: 'Atenção', value: statusCounts.warning, percentage: percentages.warning, color: 'text-amber-500', stroke: 'stroke-amber-500', offset: warningOffset },
    { label: 'Estoque Baixo', value: statusCounts.low, percentage: percentages.low, color: 'text-red-500', stroke: 'stroke-red-500', offset: lowOffset },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 h-full mt-4">
      <div className="relative w-48 h-48 flex-shrink-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle className="stroke-stone-200" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
          {chartData.map(data => (
            <circle
              key={data.label}
              className={`${data.stroke} transition-all duration-500`}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={-data.offset}
              strokeLinecap="round"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              style={{ strokeDasharray: `${(data.percentage / 100) * circumference} ${circumference}` }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-stone-800">{totalProducts}</span>
            <span className="text-sm text-stone-500">Produtos</span>
        </div>
      </div>
      <div className="space-y-2">
        {chartData.map(data => (
          <div key={data.label} className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${data.color.replace('text-', 'bg-')}`}></span>
            <span className="text-sm font-medium text-stone-600">{data.label}:</span>
            <span className="ml-auto text-sm font-semibold text-stone-800">{data.value} ({data.percentage.toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockStatusChart;