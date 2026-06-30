import { Modal, ModalBody, ModalHeader } from "@/components/ui"

export const CourseModal = ({ isOpen, title, onClose, children }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader onClose={onClose}>
            <h2 className="text-xl font-semibold">{title}</h2>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
    </Modal>
)
