/** @format */

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

//Money formatter function
function moneyFormatter(num) {
  let q = Number(num);
  let p = q.toFixed(2).split('.');
  return (
    '$' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

const ExpenseTotal = () => {
  const { expenses } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.amount);
  }, 0);
  return (
    <div className='alert alert-primary'>
      <span>
        <strong>Spent so far: {moneyFormatter(totalExpenses)}</strong>
      </span>
    </div>
  );
};

export default ExpenseTotal;
