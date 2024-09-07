import { Identifier } from "dnd-core";
import { Spinner } from "flowbite-react";
import { useCallback, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ICard from "../../types/Card";
import ImageModal from "../ImageModal/ImageModal";
import "./Card.scss";

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface CardProps {
  index: number;
  card: ICard;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Card = ({ card, index, moveCard }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: card.id, index };
    },
    // eslint-disable-next-line
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="rounded-lg border border-gray-200 bg-white shadow-md cursor-move"
      style={{
        border: isDragging ? "dashed 2px #000" : "none",
      }}
      data-handler-id={handlerId}
      onClick={onOpenModal}
    >
      <div
        style={{
          opacity: isDragging ? 0 : 1,
        }}
      >
        <figure className="flex items-center justify-center w-full h-[240px] relative">
          <img
            src={card.image}
            alt={card.type}
            loading="lazy"
            className="w-full h-full relative rounded-t-lg z-[1]"
          />
          <div className="flex items-center justify-center absolute inset-0 z-[0]">
            <Spinner />
          </div>
        </figure>
        <p className="font-medium px-3 py-2 text-lg">{card.title}</p>
        <ImageModal card={card} show={showModal} onClose={onCloseModal} />
      </div>
    </div>
  );
};

export default Card;
