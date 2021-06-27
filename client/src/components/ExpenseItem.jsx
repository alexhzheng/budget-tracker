/** @format */

import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = ({ expense, key }) => {
  const { deleteExpense } = useContext(AppContext);

  return (
    <li class='list-group-item d-flex justify-content-between align-items-center'>
      {expense.text}
      <div>
        <span class='badge bg-primary rounded-pill'>${expense.amount}</span>
        <TiDelete
          size='1.5em'
          s
          style={{ cursor: 'pointer' }}
          onClick={() => deleteExpense(expense._id)}
        />
      </div>
    </li>
  );
};

export default ExpenseItem;
