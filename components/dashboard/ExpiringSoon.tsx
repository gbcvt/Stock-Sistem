import React, { useMemo } from 'react';
import type { AdjustmentLog } from '../../types';

interface ExpiringSoonProps {
  adjustmentHistory: AdjustmentLog[];
}

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);


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
    return <div className="text-center py-10 px-4 text-stone-500 h-full flex items-center justify-center">Nenhum item vencendo nos próximos 30 dias.</div>;
  }

  return (
    <div className="divide-y divide-stone-200">
      {expiringItems.map(item => {
        const daysLeft = daysUntilExpiration(item.expirationDate!);
        const isUrgent = daysLeft <= 7;
        return (
            <div key={item.id} className="p-4 flex items-center gap-4">
                <div className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg ${isUrgent ? 'bg-red-100' : 'bg-amber-100'}`}>
                    <span className={`text-lg font-bold ${isUrgent ? 'text-red-700' : 'text-amber-800'}`}>{daysLeft}</span>
                    <span className={`text-xs font-medium ${isUrgent ? 'text-red-600' : 'text-amber-700'}`}>dias</span>
                </div>
                <div>
                    <div className="font-semibold text-stone-800">{item.productName}</div>
                    <div className="text-sm text-stone-500">
                        Lote de {item.value} unidades vence em {formatDate(item.expirationDate!)}
                    </div>
                </div>
            </div>
        )
      })}
    </div>
  );
};

export default ExpiringSoon;
