import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import CardsList from "../CardsList";
import ExpandableCard from "../ExpandableCard";

const CardsView = () => {
  const { cardSelected } = useSelector((state: State) => state.creditCards);

  return (
    <>
      <CardsList />

      {!!cardSelected.id && <ExpandableCard />}
    </>
  );
};

export default CardsView;
