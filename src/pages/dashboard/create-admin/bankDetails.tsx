import Modal from "@/components/modal";
import { useState } from "react";
import Image from "next/image";
import ToggleSwitch from "@/components/toggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddBank from "./AddBank";
import {
  useDeletePaymentMethod,
  useGetPaymentMethods,
} from "@/hooks/BankDetails";

const BankDetails = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null); // Store selected bank for editing

  // Fetch Data
  const { data: banks, isLoading, error } = useGetPaymentMethods();
  const { mutate: deletePaymentMethod } = useDeletePaymentMethod();

  // Open Add/Edit Modal
  const openModal = (bank = null) => {
    setSelectedBank(bank); // Set the selected bank for editing
    setModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedBank(null);
    setModalOpen(false);
  };

  // Delete Payment Method
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const formData = new FormData();
      formData.append("paymentMethodID", id); // Append the ID to FormData

      deletePaymentMethod(formData);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data. Please try again later.</div>;

  return (
    <>
      <div className="w-full">
        <div className="flex gap-3 justify-end items-end">
          <button
            type="button"
            onClick={() => openModal(null)}
            className="inline-flex items-center py-3 px-3 text-sm font-medium text-white bg-[#0059ff] border-none rounded-lg border border-gray-700"
          >
            Add Bank Wallet
          </button>
        </div>

        <hr className="my-5" />

        {/* Bank Table */}
        <div className="w-full overflow-x-scroll">
          <table className="bg-white w-full text-sm border-[#1D4ED8] rounded-xl border-l overflow-hidden">
            <thead>
              <tr>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">No.</th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Payment Method
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">Logo</th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  QR Code
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Account Info
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Tax Rate
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Currency Support
                </th>
                <th className="p-5 bg-[#1D4ED8] text-left text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {banks.map((data: any, index: number) => (
                <tr
                  key={index}
                  className="odd:bg-gray-100 even:bg-white text-xs"
                >
                  <td className="py-4 px-2 border-r text-center">
                    {index + 1}
                  </td>
                  <td className="py-4 px-3 border-r">{data.paymentMethod}</td>
                  <td className="py-4 px-3 border-r text-center">
                    <Image src={data.logo} height={50} width={50} alt="Logo" />
                  </td>
                  <td className="py-4 px-3 border-r text-center">
                    <Image
                      src={data.qrCode}
                      height={50}
                      width={50}
                      alt="QR Code"
                    />
                  </td>
                  <td className="py-4 px-3 border-r">{data.bankName}</td>
                  <td className="py-4 px-3 border-r">{data.vat} %</td>
                  <td className="py-4 px-3 border-r">
                    {data.currency.join(", ")}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex gap-2">
                      <ToggleSwitch />
                      <button
                        type="button"
                        onClick={() => openModal(data)}
                        className="text-xs"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(data._id)}
                        className="text-xs text-[#FF3D00]"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Bank */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Bank Details">
        <AddBank setModalOpen={setModalOpen} editData={selectedBank} />
      </Modal>
    </>
  );
};

export default BankDetails;
