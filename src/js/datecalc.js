import {formatError} from "./utils.js";
import {DateTime} from 'luxon';

export function diffDates(firstDate, secondDate) {
  firstDate = DateTime.fromISO(firstDate);
  secondDate = DateTime.fromISO(secondDate);
  if (firstDate > secondDate)
    secondDate = [firstDate, firstDate = secondDate][0];
  return secondDate.diff(firstDate, ['years', 'months', 'days']).toObject();
}

export const diffToHtml = diff => `
    <span>
        ${diff.years ? diff.years + ' лет' : ''} ${diff.months ? diff.months + ' месяцев' : ''} ${diff.days ? diff.days + ' дней' : ''}
    </span> 
`;

export function handleCalcDates(event, resultBox) {
  resultBox.innerHTML = "";
  event.preventDefault();
  let {firstDate, secondDate} = event.target.elements;
  firstDate = firstDate.value;
  secondDate = secondDate.value;

  if (firstDate && secondDate) {
    const diff = diffDates(firstDate, secondDate);
    resultBox.innerHTML = diffToHtml(diff);
  } else resultBox.innerHTML = formatError("Заполнены не все поля");
}