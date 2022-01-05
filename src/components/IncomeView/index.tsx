import { observer } from "mobx-react-lite";
import IncomeList from "../IncomeList";
import IncomeResume from "../IncomeResume";

const IncomeView = observer(() => {
  return (
    <>
      <IncomeList />

      <IncomeResume />
    </>
  )
});

export default IncomeView