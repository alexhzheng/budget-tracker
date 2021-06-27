/** @format */

import React, { useContext, useEffect } from 'react';
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

const Remaining = () => {
  const { expenses, budget, getBudget } = useContext(AppContext);

  useEffect(() => {
    getBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.amount);
  }, 0);

  const alertType =
    totalExpenses > budget.amount ? 'alert-danger' : 'alert-success';
  const sign = totalExpenses > budget.amount ? '-' : '';
  const amount = moneyFormatter(budget.amount - totalExpenses);
  return (
    <div className={`alert ${alertType}`}>
      <span>
        <strong>Remaining: {`${sign} ${amount}`}</strong>
      </span>
    </div>
  );
};

export default Remaining;
