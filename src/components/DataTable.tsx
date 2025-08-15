import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './DataTable.css';

// Define column types
export type ColumnType = {
  key: string;
  header: string;
  type?: 'text' | 'image' | 'status' | 'link';
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
};

// Define component props
export interface DataTableProps<T> {
  data: T[];
  columns: ColumnType[];
  keyField: keyof T;
  getLinkUrl?: (item: T) => string;
  getStatusClass?: (item: T) => string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

export default function DataTable<T>({
  data,
  columns,
  keyField,
  getLinkUrl,
  getStatusClass,
  imageWidth = 44,
  imageHeight = 44,
  className = '',
}: DataTableProps<T>) {
  return (
    <>
      {/* Desktop Table */}
      <div className={`table-container ${className}`}>
        <table className="data-table desktop-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={`${column.key}-column`}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={String(item[keyField])} className="data-row">
                {columns.map((column) => (
                  <td key={`${String(item[keyField])}-${column.key}`} className={`${column.key}-column`}>
                    {renderCell(item, column, getLinkUrl, getStatusClass, imageWidth, imageHeight)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="mobile-list">
        {data.map((item) => {
          const url = getLinkUrl ? getLinkUrl(item) : undefined;
          const Card = url ? Link : 'div';
          const cardProps = url ? { href: url, className: 'mobile-card' } : { className: 'mobile-card' };
          
          const imageColumn = columns.find(col => col.type === 'image');
          const primaryColumn = columns.find(col => col.type !== 'image') || columns[0];
          const statusColumn = columns.find(col => col.type === 'status');
          const detailColumns = columns.filter(col => 
            col.key !== imageColumn?.key && 
            col.key !== primaryColumn.key && 
            col.key !== statusColumn?.key
          );

          return (
            // @ts-ignore - Card can be either Link or div
            <Card key={String(item[keyField])} {...cardProps}>
              {imageColumn && (
                <div className="mobile-image-container">
                  {renderCell(item, imageColumn, getLinkUrl, getStatusClass, 60, 60)}
                </div>
              )}
              <div className="mobile-info">
                <h3 className="mobile-item-name">
                  {renderCell(item, primaryColumn, getLinkUrl, getStatusClass)}
                </h3>
                <p className="mobile-item-details">
                  {statusColumn && (
                    <span className={`status-indicator ${getStatusClass ? getStatusClass(item) : ''}`}>
                    </span>
                  )}
                  {detailColumns.map((col, index) => (
                    <React.Fragment key={col.key}>
                      {statusColumn || index > 0 ? ' - ' : ''}
                      {String(item[col.key as keyof T])}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function renderCell<T>(
  item: T, 
  column: ColumnType, 
  getLinkUrl?: (item: T) => string,
  getStatusClass?: (item: T) => string,
  imageWidth = 44,
  imageHeight = 44
) {
  const value = item[column.key as keyof T];
  
  if (column.render) {
    return column.render(value, item);
  }
  
  switch (column.type) {
    case 'image':
      return (
        <div className="data-image-container">
          <Image
            src={String(value)}
            alt="Image"
            className="data-image"
            width={imageWidth}
            height={imageHeight}
          />
        </div>
      );
      
    case 'status':
      return (
        <div className="status-display">
          <span className={`status-indicator ${getStatusClass ? getStatusClass(item) : ''}`}></span>
          <span>{String(value)}</span>
        </div>
      );
      
    case 'link':
      const url = getLinkUrl ? getLinkUrl(item) : '#';
      return (
        <Link href={url} className="data-link">
          {String(value)}
        </Link>
      );
      
    default:
      return String(value);
  }
}
