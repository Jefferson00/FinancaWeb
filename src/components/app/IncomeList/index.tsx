import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Colors, GREEN_PRIMARY, GREEN_SECONDARY } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../../utils/ItemView";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import State, {
  ICreateIncomeOnAccount,
  IIncomes,
  IIncomesOnAccount,
} from "../../../store/interfaces";
import { listByDate } from "../../../utils/listByDate";
import { getMonthName } from "../../../utils/dateFormats";
import Modal from "../../utils/Modal";
import CreateIncome from "../CreateIncome";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { differenceInCalendarMonths, format } from "date-fns";
import { IncomeCategories } from "../../../utils/types";
import { IncomeFormData } from "../../../utils/formDatas";
import {
  createIncomeOnAccount,
  deleteIncome,
  deleteIncomeOnAccount,
} from "../../../store/modules/Incomes/fetchActions";
import Loader from "../../utils/Loader";
import { getCurrentIteration } from "../../../utils/getCurrentIteration";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
});

interface Income extends IIncomes, IIncomesOnAccount {}

const IncomeList = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const { accounts } = useSelector((state: State) => state.accounts);
  const { incomes, incomesOnAccount, loading } = useSelector(
    (state: State) => state.incomes
  );
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const [incomesListState, setIncomesListState] = useState<
    { day: number; items: any[] }[]
  >([]);

  const [censored, setCensored] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [incomeSelected, setIncomeSelected] = useState<IIncomes | null>(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [
    deleteReceiveConfirmationVisible,
    setDeleteReceiveConfirmationVisible,
  ] = useState(false);
  const [confirmReceivedVisible, setConfirmReceivedVisible] = useState(false);
  const [accountIdSelected, setAccountIdSelected] = useState<string | null>(
    null
  );

  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;

  const { control, handleSubmit, setValue } = useForm<IncomeFormData>({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setModalVisibility(false);
    setValue("name", "");
    setValue("iteration", "1");
    setValue("category", IncomeCategories[0].name);
    setValue("startDate", format(new Date(), "yyyy-MM-dd"));
    setValue("value", "0");
    setIncomeSelected(null);
  };

  const handleOpenEditModal = (income: Income) => {
    setModalVisibility(true);
    setValue("name", income.name);
    setValue("receiptDefault", income.receiptDefault || income.accountId);
    setValue("iteration", income.iteration || income.income.iteration);
    setValue("category", income.category || income.income.category);
    setValue(
      "startDate",
      format(
        new Date(income.startDate || income.income.startDate),
        "yyyy-MM-dd"
      )
    );
    setValue("value", String(income.value));
    setIncomeSelected(income.income ? income.income : income);
  };

  const handleOpenDeleteModal = (income: Income) => {
    setIncomeSelected(income.income ? income.income : income);
    setDeleteConfirmationVisible(true);
  };

  const handleOpenConfirmReceiveModal = (income: Income) => {
    setConfirmReceivedVisible(true);
    setAccountIdSelected(income.receiptDefault);
    setIncomeSelected(income);
  };

  const handleOpenConfirmUnreceiveModal = (income: Income) => {
    setDeleteReceiveConfirmationVisible(true);
    setAccountIdSelected(income.accountId);
    setIncomeSelected(income);
  };

  const handleDelete = () => {
    if (user && incomeSelected) {
      dispatch(deleteIncome(incomeSelected.id, user.id));
      setDeleteConfirmationVisible(false);
      setIncomeSelected(null);
    }
  };

  const handleDeleteIncomeOnAccount = () => {
    if (user && incomeSelected) {
      const findAccount = accounts.find(
        (acc) =>
          acc.id === accountIdSelected ||
          acc.id === incomeSelected.receiptDefault
      );

      if (findAccount) {
        dispatch(
          deleteIncomeOnAccount(incomeSelected.id, user.id, findAccount)
        );
        setDeleteReceiveConfirmationVisible(false);
        setIncomeSelected(null);
        setAccountIdSelected(null);
      }
    }
  };

  const handleReceive = () => {
    if (user && incomeSelected) {
      const findAccount = accounts.find(
        (acc) =>
          acc.id === accountIdSelected ||
          acc.id === incomeSelected.receiptDefault
      );

      const currentPart = incomeSelected.endDate
        ? differenceInCalendarMonths(
            new Date(incomeSelected.endDate),
            new Date()
          )
        : null;

      const incomeOnAccountToCreate: ICreateIncomeOnAccount = {
        userId: user.id,
        accountId: accountIdSelected || incomeSelected.receiptDefault,
        incomeId: incomeSelected.id,
        month: new Date(),
        value: incomeSelected.value,
        name: incomeSelected.name,
        recurrence:
          incomeSelected.iteration === "mensal"
            ? "mensal"
            : getCurrentIteration(currentPart, incomeSelected.iteration),
      };

      if (findAccount) {
        dispatch(createIncomeOnAccount(incomeOnAccountToCreate, findAccount));
      }

      setConfirmReceivedVisible(false);
      setIncomeSelected(null);
    }
  };

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.incomeList`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.incomeList`, String(!censored));
  };

  useEffect(() => {
    listRef.current?.addEventListener("mouseenter", () => {
      if (listRef.current) listRef.current.style.overflowY = "scroll";
    });
    listRef.current?.addEventListener("mouseleave", () => {
      if (listRef.current) listRef.current.style.overflowY = "hidden";
    });
  }, []);

  useEffect(() => {
    const incomesList = listByDate(incomes, incomesOnAccount, selectedMonth);
    setIncomesListState(incomesList);
  }, [incomes, incomesOnAccount, selectedMonth]);

  return (
    <>
      <S.Container>
        <S.Header>
          <div>
            <S.Title color={titleColor}>Receitas</S.Title>
          </div>

          <S.ViewButton onClick={handleToggleCensored}>
            {censored ? (
              <FaEye color={titleColor} size={26} />
            ) : (
              <FaEyeSlash color={titleColor} size={26} />
            )}
          </S.ViewButton>
        </S.Header>

        <Button
          title="Nova receita"
          icon={() => <FaPlus color="#FFF" size={25} />}
          colors={{
            PRIMARY_BACKGROUND: GREEN_PRIMARY,
            SECOND_BACKGROUND: GREEN_SECONDARY,
            TEXT: "#fff",
          }}
          onClick={() => setModalVisibility(true)}
        />

        {censored ? (
          <S.CensoredContainer>
            <FaBan size={40} color={titleColor} />
          </S.CensoredContainer>
        ) : (
          <S.ItemsList ref={listRef}>
            {loading ? (
              <Loader
                height="150px"
                width="360.63px"
                color="#D4E3F5"
                rectLength={3}
                rectProps={{
                  height: "32",
                  rx: "20",
                  ry: "20",
                  y: "20",
                  x: "0",
                  width: "360",
                }}
              />
            ) : (
              incomesListState.map((item, index) => {
                return (
                  <div key={index}>
                    <S.DateText color={textColor}>
                      {item.day} de {getMonthName(selectedMonth)}
                    </S.DateText>
                    {item?.items?.map((i: Income, index: number) => {
                      return (
                        <ItemView
                          key={index}
                          type={"INCOME"}
                          item={i}
                          switchValue={!!i.paymentDate}
                          onEdit={() => handleOpenEditModal(i)}
                          onDelete={() => handleOpenDeleteModal(i)}
                          onChangeSwitch={() => {
                            if (!i?.paymentDate) {
                              handleOpenConfirmReceiveModal(i);
                            } else {
                              handleOpenConfirmUnreceiveModal(i);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })
            )}

            {!loading && incomesListState.length === 0 && (
              <S.Empty>
                <FaBan />
                <p>Nenhuma entrada nesse mês</p>
              </S.Empty>
            )}
          </S.ItemsList>
        )}
      </S.Container>

      <Modal visible={modalVisibility} onCancel={handleCloseModal}>
        <CreateIncome
          control={control}
          incomeId={incomeSelected?.id}
          handleSubmit={handleSubmit}
          onFinish={handleCloseModal}
          recurrence={
            incomeSelected?.iteration === "Mensal" ? "Mensal" : "Parcelada"
          }
        />
      </Modal>

      <Modal
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        overlaid
        type="Delete"
        title="Tem certeza que deseja excluir essa entrada?"
        onConfirm={handleDelete}
      />

      <Modal
        visible={deleteReceiveConfirmationVisible}
        onCancel={() => setDeleteReceiveConfirmationVisible(false)}
        overlaid
        type="Delete"
        title="Tem certeza que deseja excluir esse recebimento?"
        onConfirm={handleDeleteIncomeOnAccount}
      />

      <Modal
        visible={confirmReceivedVisible}
        onCancel={() => setConfirmReceivedVisible(false)}
        overlaid
        type="Confirmation"
        title="Em qual conta a entrada será recebida?"
        onConfirm={handleReceive}
        okButtonTitle="Receber"
        confirmationOptions={accounts}
        onSelectOption={(e) => setAccountIdSelected(e)}
        optionValue={accountIdSelected}
      />
    </>
  );
};

export default IncomeList;
