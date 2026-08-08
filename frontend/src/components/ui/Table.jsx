import React from 'react';
import { PackageX } from 'lucide-react';

export const Table = ({
  columns,
  data = [],
  emptyMessage = "No records found.",
  emptyAction,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="w-full p-8 text-center bg-pure-white rounded-3xl border border-hairline-mist">
        <div className="inline-block w-8 h-8 border-4 border-fresh-grass border-t-transparent rounded-full animate-spin mb-2" />
        <p className="text-sm text-stone-gray font-medium">Loading table data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-12 text-center bg-pure-white rounded-3xl border border-hairline-mist flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-sandstone/40 flex items-center justify-center text-stone-gray">
          <PackageX className="w-6 h-6" />
        </div>
        <p className="text-base font-semibold text-ink-black">{emptyMessage}</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-hairline-mist bg-pure-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-sandstone/30 border-b border-hairline-mist text-xs font-semibold text-stone-gray uppercase tracking-wider">
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline-mist/60 text-sm text-ink-black">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-sandstone/20 transition-colors">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`px-6 py-4 ${col.className || ''}`}>
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
