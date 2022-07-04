import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import Button from "../../utils/Button";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import State, { ICreditCard } from "../../../store/interfaces";
import Loader from "../../utils/Loader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CardFormData } from "../../../utils/formDatas";
import Modal from "../../utils/Modal";
import CreateCreditCard from "../CreateCreditCard";
import { format } from "date-fns";
import { deleteCreditCard } from "../../../store/modules/CreditCards/fetchActions";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
});

const CardsList = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const { creditCards, loading } = useSelector(
    (state: State) => state.creditCards
  );
  const listRef = useRef<HTMLDivElement>(null);
  const [censored, setCensored] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [cardSelected, setCardSelected] = useState<ICreditCard | null>(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const primaryColor = Colors.RED_PRIMARY_LIGHTER;
  const secondaryColor = Colors.RED_SECONDARY_LIGHTER;

  const { control, handleSubmit, setValue } = useForm<CardFormData>({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setModalVisibility(false);
    setValue("name", "");
    setValue("paymentDate", format(new Date(), "yyyy-MM-dd"));
    setValue("invoiceClosing", format(new Date(), "yyyy-MM-dd"));
    setValue("limit", "0");
    setCardSelected(null);
  };

  const handleOpenEditModal = (creditCard: ICreditCard) => {
    setModalVisibility(true);
    setValue("name", creditCard.name);
    setValue(
      "paymentDate",
      format(new Date(creditCard.paymentDate), "yyyy-MM-dd")
    );
    setValue(
      "invoiceClosing",
      format(new Date(creditCard.invoiceClosing), "yyyy-MM-dd")
    );
    setValue("receiptDefault", creditCard.receiptDefault);
    setValue("limit", String(creditCard.limit));
    setCardSelected(creditCard);
  };

  const handleOpenDeleteModal = (creditCard: ICreditCard) => {
    setCardSelected(creditCard);
    setDeleteConfirmationVisible(true);
  };

  const handleDelete = () => {
    if (user && cardSelected) {
      dispatch(deleteCreditCard(cardSelected.id, user.id));
      setDeleteConfirmationVisible(false);
      setCardSelected(null);
    }
  };

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.cardslist`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.cardslist`, String(!censored));
  };

  useEffect(() => {
    listRef.current?.addEventListener("mouseenter", () => {
      if (listRef.current) listRef.current.style.overflowY = "scroll";
    });
    listRef.current?.addEventListener("mouseleave", () => {
      if (listRef.current) listRef.current.style.overflowY = "hidden";
    });
  }, [creditCards]);

  return (
    <>
      <S.Container>
        <S.Header>
          <div>
            <S.Title color={titleColor}>Cartões</S.Title>
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
          title="Novo cartão"
          icon={() => <FaPlus color="#FFF" size={25} />}
          colors={{
            PRIMARY_BACKGROUND: primaryColor,
            SECOND_BACKGROUND: secondaryColor,
            TEXT: "#fff",
          }}
          onClick={() => setModalVisibility(true)}
        />

        {censored ? (
          <S.CensoredContainer>
            <FaBan size={40} color={titleColor} />
          </S.CensoredContainer>
        ) : loading ? (
          <div style={{ marginTop: 32 }}>
            <Loader width="390" height="180" color="#D4E3F5" />
          </div>
        ) : (
          <S.ItemsList ref={listRef}>
            {creditCards.map((card) => (
              <Card
                key={card.id}
                creditCard={card}
                onDelete={() => handleOpenDeleteModal(card)}
                onEdit={() => handleOpenEditModal(card)}
              />
            ))}
          </S.ItemsList>
        )}
      </S.Container>

      <Modal visible={modalVisibility} onCancel={handleCloseModal}>
        <CreateCreditCard
          control={control}
          creditCardId={cardSelected?.id}
          handleSubmit={handleSubmit}
          onFinish={handleCloseModal}
          creditCardColor={cardSelected?.color}
        />
      </Modal>

      <Modal
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        overlaid
        type="Delete"
        title="Tem certeza que deseja excluir esse cartão?"
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CardsList;
