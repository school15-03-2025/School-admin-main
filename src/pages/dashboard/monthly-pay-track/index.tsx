import React, { useState } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Select } from "@/components/Select";
import RichTable, { StatusConfig, TableColumn } from "@/components/Table";
import { Tab } from "@/components/Tabs";
import {
  Payment,
  Withdrawal,
  usePayments,
  useWithdrawals,
} from "@/hooks/queries/monthly-pay-track.hooks";
import { format } from "date-fns";

const MonthlyPayTrack = () => {
  const [activeTab, setActiveTab] = useState<"payments" | "withdrawals">(
    "payments"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    division: "",
    paymentMethod: "",
    page: currentPage,
    limit: pageSize,
  });

  const payments = usePayments(filters);
  const withdrawals = useWithdrawals(filters);

  const paymentColumns: TableColumn<Payment>[] = [
    {
      header: "No.",
      key: "index",
      width: "w-16",
      render: (_, index) => (
        <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-blue-600 mr-4">
          {pageSize * index + 1}
        </span>
      ),
    },
    { header: "Account Name", key: "accountName" },
    { header: "Account Number", key: "accountNumber" },
    {
      header: "Amount",
      key: "amount",
      render: (item: Payment) => (
        <div className="space-y-1">
          <div>${item.amount.toFixed(2)}</div>
          <div className="text-xs text-gray-500">
            VAT: ${item.vat.toFixed(2)}
            <br />
            Credited: ${item.amountCredited.toFixed(2)}
          </div>
        </div>
      ),
    },
    { header: "Transaction ID", key: "transactionID" },
    { header: "Currency", key: "currency" },
    {
      header: "Status",
      key: "status",
    },
    {
      header: "Date",
      key: "createdAt",
      render: (item: Payment) =>
        format(new Date(item.createdAt), "MMM dd, yyyy"),
    },
  ];

  const withdrawalColumns: TableColumn<Withdrawal>[] = [
    {
      header: "No.",
      key: "index",
      width: "w-16",
      render: (_, index) => (
        <span className="h-8 min-w-8 inline-flex text-white items-center justify-center rounded-lg bg-blue-600 mr-4">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    { header: "Account Name", key: "accountName" },
    { header: "Account Number", key: "accountNumber" },
    {
      header: "Amount",
      key: "amount",
      render: (item: Withdrawal) => (
        <div className="space-y-1">
          <div>${item.amount.toFixed(2)}</div>
          <div className="text-xs text-gray-500">
            VAT: ${item.vat.toFixed(2)}
            <br />
            Debit: ${item.amountDebit.toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      header: "Bank Details",
      key: "bankDetails",
      render: (item: Withdrawal) => (
        <div className="space-y-1">
          <div>Code: {item.bankCode}</div>
          {item.routingNumber && (
            <div className="text-xs text-gray-500">
              Routing: {item.routingNumber}
            </div>
          )}
        </div>
      ),
    },
    { header: "Currency", key: "currency" },
    {
      header: "Status",
      key: "status",
    },
    {
      header: "Date",
      key: "createdAt",
      render: (item: Withdrawal) =>
        format(new Date(item.createdAt), "MMM dd, yyyy"),
    },
  ];

  const statusConfigs: Record<string, StatusConfig> = {
    pending: { color: "bg-yellow-500" },
    accepted: { color: "bg-green-500" },
    spam: { color: "bg-red-500" },
    sending: { color: "bg-blue-500" },
    ineligible: { color: "bg-gray-500" },
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters((prev) => ({ ...prev, page }));
  };

  const activeData =
    activeTab === "payments" ? payments.data : withdrawals.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <Tab
            label="Accepted Payments"
            isActive={activeTab === "payments"}
            onClick={() => {
              setActiveTab("payments");
              setCurrentPage(1);
              setFilters((prev) => ({ ...prev, page: 1 }));
            }}
          />
          <Tab
            label="Accepted Withdrawals"
            isActive={activeTab === "withdrawals"}
            onClick={() => {
              setActiveTab("withdrawals");
              setCurrentPage(1);
              setFilters((prev) => ({ ...prev, page: 1 }));
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onStartDateChange={(date) =>
              setFilters((prev) => ({ ...prev, startDate: date, page: 1 }))
            }
            onEndDateChange={(date) =>
              setFilters((prev) => ({ ...prev, endDate: date, page: 1 }))
            }
          />

          <Select
            options={[
              { value: "", label: "Payment Method" },
              { value: "paypal", label: "PayPal" },
              { value: "sbi", label: "SBI Bank" },
              { value: "venmo", label: "Venmo" },
              { value: "googlepay", label: "Google Pay" },
            ]}
            value={filters.paymentMethod}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                paymentMethod: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        {activeTab === "payments" ? (
          <RichTable
            data={activeData?.docs as Payment[]}
            columns={paymentColumns}
            isLoading={payments.isLoading}
            error={payments.error}
            statusConfigs={statusConfigs}
            borderColor="border-blue-600"
            headerClassName="bg-blue-600 text-white"
            pagination={
              activeData
                ? {
                    currentPage: activeData.page,
                    totalPages: activeData.totalPages,
                    onPageChange: handlePageChange,
                  }
                : undefined
            }
          />
        ) : (
          <RichTable
            data={activeData?.docs as Withdrawal[]}
            columns={withdrawalColumns}
            isLoading={withdrawals.isLoading}
            error={withdrawals.error}
            statusConfigs={statusConfigs}
            borderColor="border-blue-600"
            headerClassName="bg-blue-600 text-white"
            pagination={
              activeData
                ? {
                    currentPage: activeData.page,
                    totalPages: activeData.totalPages,
                    onPageChange: handlePageChange,
                  }
                : undefined
            }
          />
        )}

        {activeData && (
          <div className="mt-4 text-sm text-gray-500 text-right">
            Showing {(activeData.page - 1) * activeData.limit + 1} to{" "}
            {Math.min(activeData.page * activeData.limit, activeData.totalDocs)}{" "}
            of {activeData.totalDocs} entries
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyPayTrack;
