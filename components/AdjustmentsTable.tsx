
import React from 'react';
import type { AdjustmentLog } from '../types';

interface AdjustmentsTableProps {
  logs: AdjustmentLog[];
}

const TypeBadge: React.FC<{ type: AdjustmentLog['type'] }> = ({ type }) => {
  switch (type) {
    case 'add':
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Entrada</span>;
    case 'remove':
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Saída</span>;
    case 'balance':
      return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Balanço</span>;
  }
};

const QuantityDisplay: React.FC<{ log: AdjustmentLog }> = ({ log }) => {
  switch (log.type) {
    case 'add':
      return <span className="text-green-600 font-semibold">+{log.value}</span>;
    case 'remove':
      return <span className="text-red-600 font-semibold">-{log.value}</span>;
    case 'balance':
      return <span className="text-blue-600 font-semibold">{log.value}</span>;
  }
};

const AdjustmentsTable: React.FC<AdjustmentsTableProps> = ({ logs }) => {
  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null || value === 0) return 'N/A';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-stone-200">
        <thead className="bg-stone-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Produto</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Data</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Tipo</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Quantidade</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Valor Investido</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-200">
          {logs.map(log => (
            <tr key={log.id} className="hover:bg-stone-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{log.productName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{formatDate(log.date)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500"><TypeBadge type={log.type} /></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 text-right"><QuantityDisplay log={log} /></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 text-right">{formatCurrency(log.cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdjustmentsTable;
