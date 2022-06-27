import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function getFullDayOfTheMounth(date: Date) {
  return format(date, "PPP", {
    locale: ptBR,
  });
}

export function getDayOfTheMounth(date: Date) {
  return format(date, "dd MMM", {
    locale: ptBR,
  });
}

export function getMounthAndYear(date: Date, reduced?: boolean) {
  let value = format(date, "MMM Y", {
    locale: ptBR,
  });

  if (reduced) {
    value = format(date, "MMM yy", {
      locale: ptBR,
    });
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getMonthName(date: Date) {
  switch (date.getMonth()) {
    case 0:
      return "Janeiro";

    case 1:
      return "Fevereiro";

    case 2:
      return "Março";

    case 3:
      return "Abril";

    case 4:
      return "Maio";

    case 5:
      return "Junho";

    case 6:
      return "Julho";

    case 7:
      return "Agosto";

    case 8:
      return "Setembro";

    case 9:
      return "Outubro";

    case 10:
      return "Novembro";
    case 11:
      return "Dezembro";

    default:
      break;
  }
}
