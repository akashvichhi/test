import type { CustomFlowbiteTheme } from "flowbite-react";
import { Modal } from "flowbite-react";
import ICard from "../../types/Card";

const customTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative flex h-[90dvh] flex-col rounded-lg shadow dark:bg-gray-700",
  },
};

interface ImageModalProps {
  card: ICard;
  show: boolean;
  onClose: () => void;
}

const ImageModal = ({ card, show, onClose }: ImageModalProps) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      size="7xl"
      dismissible
      theme={customTheme}
    >
      <img src={card.image} alt={card.type} className="m-auto" />
    </Modal>
  );
};

export default ImageModal;
