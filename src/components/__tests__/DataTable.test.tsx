import { render } from '@testing-library/react';
import DataTable, { ColumnType } from '../DataTable';

const testData = [
  { id: 1, name: 'Rick', status: 'Alive' },
];

const columns: ColumnType<typeof testData[0]>[] = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' }
];

describe('DataTable', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(<DataTable data={testData} columns={columns} keyField="id" />);
    }).not.toThrow();
  });

  it('handles empty data', () => {
    expect(() => {
      render(<DataTable data={[]} columns={columns} keyField="id" />);
    }).not.toThrow();
  });
});
