import { observer } from "mobx-react-lite";
import CardsList from "../CardsList";
import ExpandableCard from "../ExpandableCard";

const CardsView = observer(() => {
  const invoiceItems = [
    {
      day: new Date(),
      items: [
        {
          name: "Conta de coisa",
          recurrence: "1/5",
          value: 50000,
        },
        {
          name: "Conta de coisa",
          recurrence: "1/5",
          value: 50000,
        },
      ],
    },
    {
      day: new Date(),
      items: [
        {
          name: "Conta de coisa",
          recurrence: "1/5",
          value: 50000,
        },
      ],
    },
    {
      day: new Date(),
      items: [
        {
          name: "Conta de coisa",
          recurrence: "1/5",
          value: 50000,
        },
        {
          name: "Conta de coisa",
          recurrence: "1/5",
          value: 50000,
        },
        {
          name: "Conta de coisa",
          recurrence: "1/5",
          value: 50000,
        },
        {
          name: "Conta de coisa",
          recurrence: "1/5",
          value: 50000,
        },
      ],
    },
  ];
  return (
    <>
      <CardsList />

      <ExpandableCard
        card={{
          limit: 700000,
          color: "#612F74",
          name: "Nubank",
          pay_date: new Date(),
        }}
        invoice={{
          value: 20000,
          paid: false,
          invoiceItems,
        }}
      />
    </>
  );
});

export default CardsView;
