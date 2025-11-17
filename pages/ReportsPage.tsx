
import React, { useState, useMemo } from 'react';
import type { AdjustmentLog } from '../types';
import AdjustmentsTable from '../components/AdjustmentsTable';

interface ReportsPageProps {
  adjustmentHistory: AdjustmentLog[];
}

const ReportsPage: React.FC<ReportsPageProps> = ({ adjustmentHistory }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredHistory = useMemo(() => {
    // Se nenhuma data for selecionada, retorna todo o histórico
    if (!startDate && !endDate) {
      return adjustmentHistory;
    }

    return adjustmentHistory.filter(log => {
      const logDate = new Date(log.date);

      if (startDate) {
        // Adiciona 'T00:00:00' para garantir que a data seja interpretada no fuso horário local
        const start = new Date(`${startDate}T00:00:00`);
        if (logDate < start) return false;
      }

      if (endDate) {
        // Adiciona 'T23:59:59' para cobrir o dia inteiro no fuso horário local
        const end = new Date(`${endDate}T23:59:59`);
        if (logDate > end) return false;
      }
      
      return true;
    });
  }, [adjustmentHistory, startDate, endDate]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 sm:p-6 border-b border-stone-200 space-y-4">
        <h2 className="text-2xl font-bold text-stone-700">Relatório de Ajustes</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-stone-700">Data de Início</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="mt-1 block w-full sm:w-auto px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-stone-700">Data de Fim</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="mt-1 block w-full sm:w-auto px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {filteredHistory.length > 0 ? (
        <AdjustmentsTable logs={filteredHistory} />
      ) : (
        <div className="text-center py-16 px-4">
          <p className="text-stone-600 text-xl font-semibold">Nenhum ajuste encontrado</p>
          <p className="text-stone-500 mt-2">Tente ajustar o período do filtro.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
