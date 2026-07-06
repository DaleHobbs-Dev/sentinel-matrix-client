import { useState } from "react";
import {
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@/components";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  deleteItem,
  itemId,
  onDeleted,
  title,
  message,
  itemName,
  restoreMessage = "This will hide it from the system. This action can be reversed by an administrator.",
  confirmLabel = "Delete",
  deletingLabel = "Deleting...",
  errorMessage = "Unable to delete item.",
  isDeleting = false,
}) {
  const [internalDeleting, setInternalDeleting] = useState(false);
  const [error, setError] = useState(null);
  const deleting = isDeleting || internalDeleting;

  const handleClose = () => {
    if (deleting) {
      return;
    }

    setError(null);
    onClose?.();
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    if (!deleteItem) {
      return;
    }

    setInternalDeleting(true);
    setError(null);

    try {
      await deleteItem(itemId);
      onDeleted?.();
    } catch (err) {
      setError(err.body?.message || err.message || errorMessage);
    } finally {
      setInternalDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader onClose={handleClose}>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {title || "Confirm Deletion"}
          </h2>
        </div>
      </ModalHeader>

      <ModalBody>
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}

        <Text className="mb-2">
          {message || "Are you sure you want to delete this item?"}
        </Text>
        {itemName && (
          <Text className="rounded border-l-4 border-danger bg-surface-muted p-3 font-semibold">
            "{itemName}"
          </Text>
        )}
        {restoreMessage && (
          <Text variant="subtle" className="mt-3">
            {restoreMessage}
          </Text>
        )}
      </ModalBody>

      <ModalFooter className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClose}
          disabled={deleting}
          className="focus-ring"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleConfirm}
          disabled={deleting}
          className="focus-ring"
        >
          {deleting ? deletingLabel : confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
