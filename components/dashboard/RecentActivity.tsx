import React from 'react';
import type { AdjustmentLog } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';
import ClipboardCheckIcon from '../icons/ClipboardCheckIcon';

interface RecentActivityProps {
  history: AdjustmentLog[];
}

const ActivityIcon: React.FC<{type: AdjustmentLog['type']}> = ({ type }) => {
    switch (type) {
        case 'add': return <div className="bg-green-100 rounded-full p-1.5"><PlusIcon className="w-4 h-4 text-green-700" /></div>;
        case 'remove': return <div className="bg-red-100 rounded-full p-1.5"><MinusIcon className="w-4 h-4 text-red-700" /></div>;
        case 'balance': return <div className="bg-blue-100 rounded-full p-1.5"><ClipboardCheckIcon className="w-4 h-4 text-blue-700" /></div>;
    }
}

const RecentActivity: React.FC<RecentActivityProps> = ({ history }) => {
    
  if (history.length === 0) {
    return <div className="text-center py-10 px-4 text-slate-500">Nenhuma atividade no período selecionado.</div>;
  }

  const formatDescription = (log: AdjustmentLog) => {
    switch (log.type) {
      case 'add': return `Adicionou ${log.value} unidade(s).`;
      case 'remove': return `Removeu ${log.value} unidade(s).`;
      case 'balance': return `Balanço ajustado para ${log.value}.`;
    }
  };
  
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " anos atrás";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses atrás";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " dias atrás";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas atrás";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos atrás";
    return "agora mesmo";
  }

  return (
    <div className="flow-root max-h-96 overflow-y-auto">
        <ul role="list" className="-mb-8 px-6 pb-6">
            {history.map((log, logIdx) => (
            <li key={log.id}>
                <div className="relative pb-8">
                {logIdx !== history.length - 1 ? (
                    <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start space-x-3">
                    <div>
                        <ActivityIcon type={log.type} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div>
                            <p className="text-sm text-slate-600">
                                <span className="font-semibold text-slate-800">{log.productName}</span> {formatDescription(log)}
                            </p>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">{timeAgo(log.date)}</p>
                    </div>
                </div>
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default RecentActivity;