import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean; // Whether the modal is open
  onConfirm: () => void; // Callback when the user confirms
  onCancel: () => void; // Callback when the user cancels
  message: string; // The message to display
}

export const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }: ConfirmationModalProps) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-background p-6 rounded-lg shadow-lg text-center border-primary border-2 border-b-4">
        <p className="text-lg text-text mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};