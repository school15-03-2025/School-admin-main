import { useGetfourcards, useDeletefourcards } from "@/hooks/FourCard";
import React, { useState } from "react";
import CardLayouts from "../cardLayout";
import { toast } from "react-hot-toast";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/components/Loader";

function FourCard({ activeCard3Tab, setActiveCard3Tab }: any) {
  const { data: cards3, isLoading, isError } = useGetfourcards();
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<any | null>(null);

  const deleteCardMutation = useDeletefourcards();

  const handleDelete = (cardId: string) => {
    if (confirm("Are you sure you want to delete this card?")) {
      const formData = new FormData();
      formData.append("cardID", cardId);

      deleteCardMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Card deleted successfully!");
          if (activeCard3Tab === cardId) setActiveCard3Tab(null);
        },
      });
    }
  };

  return (
    <div className="w-full">
      {/* Add New Card Button */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Cards List</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCard(null);
          }}
          className="px-6 py-2 bg-[#000080] text-white rounded-lg hover:bg-blue-700"
        >
          + Add Card
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Tags</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading State */}
            {isLoading && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  <Loader />
                </td>
              </tr>
            )}

            {/* Error State */}
            {isError && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-red-500">
                  Error while fetching the data.
                </td>
              </tr>
            )}

            {/* Data Rows */}
            {!isLoading && !isError && cards3.length > 0
              ? cards3.map((card: any, index: number) => (
                  <tr key={card.key} className="text-center border-t">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{card.title}</td>
                    <td className="py-2 px-4 border">{card.tags}</td>
                    <td className="py-2 px-4 border space-x-2">
                      <button
                        onClick={() => {
                          setEditingCard(card);
                          setShowForm(true);
                        }}
                        className="px-4 py-1 bg-[#0059ff] text-white rounded-md hover:bg-blue-700"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(card._id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              : !isLoading &&
                !isError && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No cards found.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      {/* Card Form */}
      {showForm && (
        <div className="p-4 bg-white border border-gray-300 rounded-lg mt-4 relative">
          <CardLayouts
            title={editingCard ? "Edit Card" : "Add New Card"}
            mode={editingCard ? "edit" : "add"}
            existingData={editingCard}
            showForm={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              setEditingCard(null);
            }}
          />
          <button
            onClick={() => {
              setShowForm(false);
              setEditingCard(null);
            }}
            className="mt-3 px-4 py-1 text-black absolute top-0 right-2 font-bold text-xl"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default FourCard;
