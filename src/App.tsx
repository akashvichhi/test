import { useCallback, useState } from "react";
import data from "./assets/data/data.json";
import Card from "./components/Card";
import ICard from "./types/Card";

function App() {
  const [cards, setCards] = useState(data);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: ICard[]) => {
      const result = [...prevCards];
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);
      return result;
    });
  }, []);

  return (
    <div className="container mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((d: ICard, index) => (
          <Card key={d.position} index={index} card={d} moveCard={moveCard} />
        ))}
      </div>
    </div>
  );
}

export default App;
