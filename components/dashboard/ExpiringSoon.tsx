import React, { useMemo } from 'react';
import type { AdjustmentLog } from '../../types';

interface ExpiringSoonProps {
  adjustmentHistory: AdjustmentLog[];
}

const ExpiringSoon: React.FC<ExpiringSoonProps> = ({ adjustmentHistory }) => {
  const expiringItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return adjustmentHistory
      .filter(log => {
        if (log.type !== 'add' || !log.expirationDate) return false;
        const expirationDate = new Date(log.expirationDate + 'T00:00:00'); // Treat as local timezone
        return expirationDate >= today && expirationDate <= thirtyDaysFromNow;
      })
      .sort((a, b) => new Date(a.expirationDate!).getTime() - new Date(b.expirationDate!).getTime())
      .slice(0, 4);
  }, [adjustmentHistory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  const daysUntilExpiration = (dateString: string) => {
    const expirationDate = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  if (expiringItems.length === 0) {
    return <div className="text-center py-10 px-4 text-slate-500 h-full flex items-center justify-center">Nenhum item vencendo nos próximos 30 dias.</div>;
  }

  return (
    <div className="flow-root">
        <ul className="divide-y divide-slate-200">
      {expiringItems.map(item => {
        const daysLeft = daysUntilExpiration(item.expirationDate!);
        const isUrgent = daysLeft <= 7;
        return (
            <li key={item.id} className="p-4 flex items-center space-x-4">
                <div className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg ${isUrgent ? 'bg-red-100' : 'bg-amber-100'}`}>
                    <span className={`text-lg font-bold ${isUrgent ? 'text-red-700' : 'text-amber-800'}`}>{daysLeft}</span>
                    <span className={`text-xs font-medium ${isUrgent ? 'text-red-600' : 'text-amber-700'}`}>dias</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{item.productName}</p>
                    <p className="text-sm text-slate-500">
                        Lote de {item.value} unidades vence em {formatDate(item.expirationDate!)}
                    </p>
                </div>
            </li>
        )
      })}
        </ul>
    </div>
  );
};

export default ExpiringSoon;