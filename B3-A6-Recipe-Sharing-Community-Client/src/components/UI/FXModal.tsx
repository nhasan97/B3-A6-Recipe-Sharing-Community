import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/modal";
import { IFXModalProps } from "@/src/types/FX.type";

const FXModal = ({
  title,
  size,
  children,
  buttonText,
  buttonVariant = "solid",
  buttonClassName = "",
  buttonSize = "md",
  radius = "lg",
  isIconOnly = false,
}: IFXModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className={buttonClassName}
        variant={buttonVariant}
        size={buttonSize}
        radius={radius}
        isIconOnly={isIconOnly}
      >
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        scrollBehavior={"inside"}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="p-0 px-6">{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FXModal;
