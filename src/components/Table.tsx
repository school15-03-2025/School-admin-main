import React from "react";
import { format } from "date-fns";
import Skeleton from "./Skeleton";
import Alert from "./Alert";

type SortDirection = "asc" | "desc";

export interface TableColumn<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface StatusConfig {
  color: string;
  textColor?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  error?: Error | null;
  statusConfigs?: Record<string, StatusConfig>;
  onRowClick?: (item: T) => void;
  rowActions?: (item: T) => React.ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  defaultSort?: {
    key: keyof T | string;
    direction: SortDirection;
  };
  customEmptyState?: React.ReactNode;
  customLoadingState?: React.ReactNode;
  customErrorState?: React.ReactNode;
  rowClassName?: (item: T, index: number) => string;
  borderColor?: string;
  headerClassName?: string;
}

export const TableSkeleton = () => (
  <div className="w-full space-y-1">
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
  </div>
);

export const RichTable = <T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  error = null,
  statusConfigs = {},
  onRowClick,
  rowActions,
  pagination,
  defaultSort,
  customEmptyState,
  customLoadingState,
  customErrorState,
  rowClassName,
  borderColor = "border-blue-600",
  headerClassName = "bg-blue-600 text-white",
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | string;
    direction: SortDirection;
  } | null>(defaultSort || null);

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;
    setSortConfig((currentSort) => {
      if (!currentSort || currentSort.key !== column.key) {
        return { key: column.key, direction: "asc" };
      }
      if (currentSort.direction === "asc") {
        return { key: column.key, direction: "desc" };
      }
      return null;
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const renderCell = (item: T, index: number, column: TableColumn<T>) => {
    if (column.render) {
      return column.render(item, index);
    }
    const value = item[column.key as keyof T];
    // Check if the value is a Date object and format it
    if (
      Object.prototype.toString.call(value) === "[object Date]" &&
      !isNaN(value.getTime())
    ) {
      return format(value, "MMM dd, yyyy");
    }
    if (typeof value === "boolean") {
      return value ? "✓" : "✗";
    }

    return value ?? "";
  };

  const renderStatus = (status: string) => {
    const config = statusConfigs[status.toLowerCase()] || {
      color: "bg-gray-200",
      textColor: "text-gray-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          config.color
        } ${config.textColor || "text-white"}`}
      >
        {status}
      </span>
    );
  };

  // Calculate extra column for rowActions (if any)
  const totalCols = columns.length + (rowActions ? 1 : 0);

  return (
    <div className="w-full overflow-x-auto">
      <table className={`text-sm border-collapse w-full ${borderColor}`}>
        {/* The table headers are always displayed */}
        <thead className={headerClassName}>
          <tr>
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={`p-4 text-left border-r ${borderColor} ${
                  column.sortable ? "cursor-pointer select-none" : ""
                } ${column.width || ""} ${
                  column.align ? `text-${column.align}` : ""
                }`}
                onClick={() => column.sortable && handleSort(column)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && sortConfig?.key === column.key && (
                    <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
            {rowActions && <th className="p-4 text-left">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {/* Loading State */}
          {isLoading && (
            <tr>
              <td colSpan={totalCols}>
                {customLoadingState || <TableSkeleton />}
              </td>
            </tr>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <tr>
              <td colSpan={totalCols}>
                {customErrorState || (
                  <Alert className="w-full" type="danger">
                    {error.message}
                  </Alert>
                )}
              </td>
            </tr>
          )}

          {/* Empty State */}
          {!isLoading && !error && data.length === 0 && (
            <tr>
              <td colSpan={totalCols}>
                {customEmptyState || (
                  <div className="w-full text-center py-8 text-gray-500">
                    No data available
                  </div>
                )}
              </td>
            </tr>
          )}

          {/* Normal Data Rows */}
          {!isLoading &&
            !error &&
            data.length > 0 &&
            sortedData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowClassName
                    ? rowClassName(item, rowIndex)
                    : rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                } hover:bg-gray-100 transition-colors ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIndex) => {
                  const cellValue =
                    column.key === "status"
                      ? renderStatus(String(item[column.key]))
                      : renderCell(item, colIndex, column);
                  return (
                    <td
                      key={colIndex}
                      className={`p-4 border-r ${borderColor} ${
                        column.align ? `text-${column.align}` : ""
                      }`}
                    >
                      {cellValue}
                    </td>
                  );
                })}
                {rowActions && <td className="p-4">{rowActions(item)}</td>}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination (only visible if we have pages and data to show) */}
      {pagination && pagination.totalPages > 1 && !isLoading && !error && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              disabled={pagination.currentPage === 1}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              Previous
            </button>

            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
        </div>
      )}
    </div>
  );
};

export default RichTable;
