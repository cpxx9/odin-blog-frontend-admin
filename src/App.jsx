import './styles/App.css';
import routesConfig from './routes/routesConfig';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';

const router = createBrowserRouter(routesConfig);

// export const ExpenseContext = createContext({
//   expenseTable: [],
//   addToTable: () => {},
// });

function App() {
  return (
    // <ExpenseContext.Provider value={{ expenseTable, addToTable }}>
    <RouterProvider router={router} />
    // </ExpenseContext.Provider>
  );
}

export default App;
