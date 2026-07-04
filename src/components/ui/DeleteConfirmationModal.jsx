import {
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
  title,
  message,
  itemName,
  isDeleting = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
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
        <Text className="mb-2">
          {message || "Are you sure you want to delete this item?"}
        </Text>
        {itemName && (
          <Text className="rounded border-l-4 border-danger bg-surface-muted p-3 font-semibold">
            "{itemName}"
          </Text>
        )}
        <Text variant="subtle" className="mt-3">
          This will hide it from the system. This action can be reversed by an
          administrator.
        </Text>
      </ModalBody>

      <ModalFooter className="flex justify-end gap-3">
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={isDeleting}
          className="focus-ring"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={onConfirm}
          disabled={isDeleting}
          className="focus-ring"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
