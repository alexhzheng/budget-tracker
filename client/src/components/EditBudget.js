/** @format */

import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const EditBudget = (props) => {
  const [value, setValue] = useState(props.budget.amount);

  const { editBudget } = useContext(AppContext);

  return (
    <div>
      <input
        required='required'
        type='number'
        className='form-control mr-3'
        id='name'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        type='button'
        class='btn btn-primary'
        onClick={() => props.handleSaveClick(value)}>
        Save
      </button>
    </div>
  );
};

export default EditBudget;
