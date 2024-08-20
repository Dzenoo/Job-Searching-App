import React from "react";
import { TableProps } from "./types";

const Table: React.FC<TableProps> = ({ columns, data, specialStyles }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300 border dark:border-[#393939] dark:divide-[#1b1b1b] table-fixed">
        <thead className="rounded-lg bg-gray-50 dark:bg-[#1b1b1b]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 rounded-lg dark:bg-[#0d0d0d] dark:divide-[#1b1b1b] relative">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              className="hover:bg-gray-100 dark:hover:bg-[#1b1b1b] transition"
            >
              {columns.map((column, colIndex) => (
                <td
                  scope="row"
                  key={colIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 ${
                    specialStyles?.[column] || ""
                  }`}
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
