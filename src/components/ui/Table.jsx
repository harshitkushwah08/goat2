import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import Tooltip from './toolTip';
import { Eye, Edit, Trash2, Download } from 'lucide-react';

export const Table = ({ 
  columns, 
  data, 
  onView, 
  onEdit, 
  onDelete, 
  onDownload,
  statusColorMap = {},
  emptyMessage = "No data available",
  className = ""
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 bg-boldWhite border border-bodyGray-200 rounded-lg">
        <p className="text-bodyGray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-primary-50 border-b-2 border-b-primary-200 text-bodyGray-800 h-16">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="text-left py-3 px-3 text-bodyGray-500"
                style={column.width ? { width: column.width } : {}}
              >
                {column.header}
              </th>
            ))}
            {(onView || onEdit || onDelete || onDownload) && (
              <th className="text-left py-3 px-3 text-bodyGray-500">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="border-b border-bodyGray-300 h-16 hover:bg-primary-50 transition"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-4">
                  {column.render ? (
                    column.render(row)
                  ) : column.isStatus ? (
                    <Badge 
                      variant={statusColorMap[row[column.accessor]] || 'secondary'}
                    >
                      {row[column.accessor]}
                    </Badge>
                  ) : (
                    <span className={column.className || ''}>
                      {row[column.accessor]}
                    </span>
                  )}
                </td>
              ))}
              {(onView || onEdit || onDelete || onDownload) && (
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {onView && (
                      <Tooltip text="View">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:text-blue-600 active:scale-95 transition-all"
                          onClick={() => onView(row)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    )}
                    {onDownload && (
                      <Tooltip text="Download">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:text-blue-700 hover:bg-blue-200 active:scale-95 transition-all"
                          onClick={() => onDownload(row)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    )}
                    {onEdit && (
                      <Tooltip text="Edit">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:text-primary-600 active:scale-95 transition-all"
                          onClick={() => onEdit(row)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip text="Delete">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:text-red-600 active:scale-95 transition-all"
                          onClick={() => onDelete(row)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;