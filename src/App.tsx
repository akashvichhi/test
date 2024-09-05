import axios from "axios";
import { Spinner } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Card from "./components/Card";
import ICard from "./types/Card";
import { getTimeDifference } from "./utils/date";

let updatedCards: ICard[] = [];

function App() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedDate, setLastSavedDate] = useState<Date | null>(null);
  const [lastSaved, setLastSaved] = useState<string>("");

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newCards = [...cards];
      const [removed] = newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, removed);
      setCards([...newCards]);
      updatedCards = [...newCards];
    },
    [cards]
  );

  const getData = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/api/cats")
      .then((res) => {
        setIsLoading(false);
        setCards([...res.data.data]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("====> err", err);
      });
  }, []);

  const saveCards = useCallback(() => {
    if (updatedCards.length) {
      setIsSaving(true);
      axios
        .post("/api/cats", updatedCards)
        .then(() => {
          setIsSaving(false);
          setLastSavedDate(new Date());
        })
        .catch((err) => {
          setIsSaving(false);
          console.log("====> err", err);
        });
      updatedCards = [];
    }
  }, []);

  const showLastSaved = () => {
    if (lastSavedDate) {
      setLastSaved(getTimeDifference(lastSavedDate));
    }
  };

  useEffect(() => {
    getData();

    let interval: NodeJS.Timeout | null = null;
    interval = setInterval(() => {
      saveCards();
    }, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    showLastSaved();
    interval = setInterval(() => {
      showLastSaved();
    }, 5000);

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [lastSavedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container mt-4">
      {isLoading && <div className="text-center">Loading data...</div>}
      {lastSaved ? <div className="mb-2">Last saved: {lastSaved}</div> : null}
      {isSaving && (
        <div className="mb-2">
          Saving <Spinner size="sm" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((d: ICard, index) => (
          <Card key={d.position} index={index} card={d} moveCard={moveCard} />
        ))}
      </div>
    </div>
  );
}

export default App;
