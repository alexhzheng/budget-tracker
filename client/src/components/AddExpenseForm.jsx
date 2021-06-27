/** @format */

import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

const AddExpenseForm = () => {
  const { addExpense } = useContext(AppContext);
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    const expense = { id: uuidv4(), text: name, amount: +cost };

    addExpense(expense);
    setName('');
    setCost(0);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <div className='col-sm'>
          <label for='name'>Name</label>
          <input
            required='required'
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(event) => setName(event.target.value)}></input>
        </div>
        <div className='col-sm'>
          <label for='Cost'>Cost</label>
          <input
            required='required'
            type='text'
            className='form-control'
            id='cost'
            value={cost}
            onChange={(event) => setCost(event.target.value)}></input>
        </div>
        <div class='row mt-3'>
          <div class='col-sm'>
            <button type='submit' class='btn btn-primary'>
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
