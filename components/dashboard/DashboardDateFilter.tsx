import React from 'react';

interface DashboardDateFilterProps {
  filterDate: Date;
  setFilterDate: (date: Date) => void;
  availableYears: number[];
}

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const DashboardDateFilter: React.FC<DashboardDateFilterProps> = ({ filterDate, setFilterDate, availableYears }) => {
  const currentMonth = filterDate.getMonth();
  const currentYear = filterDate.getFullYear();

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setFilterDate(new Date(currentYear, newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setFilterDate(new Date(newYear, currentMonth, 1));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <h3 className="text-lg font-semibold text-stone-700 flex-shrink-0">Visão Geral do Mês</h3>
        <div className="flex-grow w-full sm:w-auto flex items-center gap-2 sm:justify-end">
            <select
                value={currentMonth}
                onChange={handleMonthChange}
                className="w-full sm:w-auto rounded-md border-stone-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                aria-label="Selecionar Mês"
            >
                {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>
            <select
                value={currentYear}
                onChange={handleYearChange}
                className="w-full sm:w-auto rounded-md border-stone-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                aria-label="Selecionar Ano"
            >
                {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    </div>
  );
};

export default DashboardDateFilter;
