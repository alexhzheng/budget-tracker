/** @format */

import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import EditBudget from './EditBudget';
import ViewBudget from './ViewBudget';

const Budget = () => {
  const { budget, getBudget, editBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (value) => {
    setIsEditing(false);
    editBudget(value);
    getBudget();
    window.location.reload();
  };

  return (
    <div class='alert alert-secondary p-3 d-flex align-items-center justify-content-between'>
      {isEditing ? (
        <EditBudget
          handleSaveClick={handleSaveClick}
          key={budget.id}
          budget={budget}
        />
      ) : (
        // For part 1 render component inline rather than create a seperate one

        <ViewBudget
          handleEditClick={handleEditClick}
          key={budget.id}
          budget={budget}
        />
      )}
    </div>
  );
};

export default Budget;
