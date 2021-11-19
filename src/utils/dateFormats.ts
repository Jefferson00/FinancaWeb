import { format, } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getFullDayOfTheMounth(date: Date) {
  return format(date, 'PPP', {
    locale: ptBR,
  })
}

export function getDayOfTheMounth(date: Date) {
  return format(date, 'dd MMM', {
    locale: ptBR,
  })
}

export function getMounthAndYear(date: Date, reduced?: boolean) {
  let value = format(date, 'MMM Y', {
    locale: ptBR,
  });

  if (reduced) {
    value = format(date, 'MMM yy', {
      locale: ptBR,
    });
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

