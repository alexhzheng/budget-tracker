/** @format */

import React from 'react';

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

const ViewBudget = ({ budget, handleEditClick }) => {
  return (
    <>
      <span>
        <strong>Budget:{moneyFormatter(budget.amount)}</strong>
      </span>
      <button type='button' class='btn btn-primary' onClick={handleEditClick}>
        Edit
      </button>
    </>
  );
};

export default ViewBudget;
