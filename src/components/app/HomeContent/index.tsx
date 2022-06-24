import Estimates from "../EstimatesView";
import Transactions from "../Transactions";
import RemindView from "../RemindView";

interface RemindItemProps {
  day: Date;
  items: {
    id: string;
    category: string;
    name: string;
    value: number;
    date: Date;
    type: "EXPANSE" | "INCOME";
    received: boolean;
  }[];
}

const HomeContent = () => {
  const lateItems: RemindItemProps[] = [
    {
      day: new Date(),
      items: [
        {
          id: "f015df05d",
          category: "Casa",
          name: "Conta de coisa",
          value: 58590,
          date: new Date(),
          type: "EXPANSE",
          received: false,
        },
      ],
    },
  ];

  const nextDaysItems: RemindItemProps[] = [
    {
      day: new Date(),
      items: [
        {
          id: "f015df05d",
          category: "Casa",
          name: "Conta de coisa",
          value: 58590,
          date: new Date(),
          type: "EXPANSE",
          received: false,
        },
      ],
    },
    {
      day: new Date(),
      items: [
        {
          id: "f015df05d",
          category: "Casa",
          name: "Conta de coisa",
          value: 58590,
          date: new Date(),
          type: "INCOME",
          received: false,
        },
        {
          id: "f015df05d",
          category: "Casa",
          name: "Conta de coisa",
          value: 58590,
          date: new Date(),
          type: "EXPANSE",
          received: false,
        },
      ],
    },
  ];

  return (
    <>
      <Estimates />

      <Transactions />

      <RemindView type="LATE" items={lateItems} />

      <RemindView type="NEXTDAYS" items={nextDaysItems} />
    </>
  );
};

export default HomeContent;
