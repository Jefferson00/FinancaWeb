import { observer } from "mobx-react-lite";
import ExpanseResume from "../ExpanseResume";
import ExpansesList from "../ExpansesList";

const ExpansesView = observer(() => {
  return (
    <>
      <ExpansesList />

      <ExpanseResume />
    </>
  );
});

export default ExpansesView;
