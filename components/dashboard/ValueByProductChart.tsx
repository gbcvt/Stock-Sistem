import React, { useMemo } from 'react';
import type { Product } from '../../types';

interface ValueByProductChartProps {
  products: Product[];
}

const ValueByProductChart: React.FC<ValueByProductChartProps> = ({ products }) => {
  const topProductsByValue = useMemo(() => {
    return products
      .map(p => ({
        ...p,
        totalValue: p.stock * p.averageCost,
      }))
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 5);
  }, [products]);

  const maxValue = useMemo(() => {
    return topProductsByValue.length > 0 ? topProductsByValue[0].totalValue : 0;
  }, [topProductsByValue]);

  if (products.length === 0) {
    return <div className="flex items-center justify-center h-full text-stone-500">Sem dados de insumos.</div>;
  }
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <div className="space-y-4 pt-4 h-full flex flex-col justify-around">
      {topProductsByValue.map((product, index) => (
        <div key={product.id} className="flex items-center gap-4">
          <div className="w-2/5 truncate text-sm font-medium text-stone-600" title={product.name}>
            {product.name}
          </div>
          <div className="w-3/5">
            <div className="flex justify-between items-center mb-1">
              <div className="relative w-full bg-stone-100 rounded-full h-4">
                <div
                  className="bg-orange-700 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${maxValue > 0 ? (product.totalValue / maxValue) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="w-24 text-right text-sm font-semibold text-stone-800 ml-2">
                {formatCurrency(product.totalValue)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ValueByProductChart;
