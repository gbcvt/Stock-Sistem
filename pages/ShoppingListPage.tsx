import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import PrinterIcon from '../components/icons/PrinterIcon';

interface ShoppingListPageProps {
  products: Product[];
}

const ShoppingListPage: React.FC<ShoppingListPageProps> = ({ products }) => {
  const [includeWarning, setIncludeWarning] = useState(true);

  const shoppingList = useMemo(() => {
    return products
      .filter(p => {
        if (p.reorderLevel <= 0) return false;
        const isLow = p.stock < p.reorderLevel;
        const isWarning = p.stock <= p.reorderLevel * 1.2;
        return isLow || (includeWarning && isWarning);
      })
      .map(p => {
        const targetStock = Math.ceil(p.reorderLevel * 1.5);
        const purchaseAmount = Math.max(0, targetStock - p.stock);
        return { ...p, purchaseAmount };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, includeWarning]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 no-print">
        <div>
          <label htmlFor="include-warning" className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id="include-warning"
              checked={includeWarning}
              onChange={(e) => setIncludeWarning(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-slate-700">Incluir itens em "Atenção"</span>
          </label>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <PrinterIcon className="h-5 w-5 mr-2" />
          Imprimir Lista
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm printable-area">
        <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">Lista de Compras</h2>
            <p className="text-sm text-slate-500 mt-1">
                Gerada em: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
        </div>

        {shoppingList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Insumo</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Estoque Atual</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ponto de Recompra</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Comprar (Sugestão)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {shoppingList.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">{item.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">{item.reorderLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600 text-right">{Math.ceil(item.purchaseAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <p className="text-slate-600 text-xl font-semibold">Tudo em ordem!</p>
            <p className="text-slate-500 mt-2">Nenhum item na lista de compras no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListPage;