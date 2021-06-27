/** @format */
import { createContext, useReducer } from 'react';
import axios from 'axios';

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_EXPENSE':
      return {
        ...state,
        loading: false,
        expenses: action.payload,
      };

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case 'EDIT_BUDGET':
      return {
        ...state,
        budget: action.payload,
      };
    case 'GET_BUDGET':
      return {
        ...state,
        loading: false,
        budget: action.payload,
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  budget: 0,
  expenses: [],
  error: null,
  loading: true,
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get('api/v1/transactions');
      dispatch({ type: 'GET_EXPENSE', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.response.data.error });
    }
  }

  async function deleteExpense(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_EXPENSE',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function addExpense(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'ADD_EXPENSE',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function getBudget() {
    try {
      const res = await axios.get('api/v1/Budget');
      dispatch({ type: 'GET_BUDGET', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data.error });
    }
  }

  async function editBudget(value) {
    try {
      const res = await axios.put(`/api/v1/Budget/${value}`);
      dispatch({
        type: 'EDIT_BUDGET',
        payload: res.data.data,
      });
      // const res = await axios.put(`/api/v1/Budget/${budgetid}`, value);
      // dispatch({
      //   type: 'EDIT_BUDGET',
      //   payload: res.data.data,
      // });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  return (
    <AppContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        loading: state.loading,
        error: state.error,
        dispatch,
        getTransactions,
        addExpense,
        deleteExpense,
        getBudget,
        editBudget,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
