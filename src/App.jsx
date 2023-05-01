import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { GrNotes } from 'react-icons/gr';
import Modal from "./Components/Modal";
import uniqid from 'uniqid';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRequestType, setModalRequestType] = useState('');
  const [expenses, setExpense] = useState([]);
  const [incomes, setIncome] = useState([]);





  function expenseBoxClick() {
    setIsModalOpen(true);
    setModalRequestType('expense');
  }

  function incomeBoxClick() {
    setIsModalOpen(true);
    setModalRequestType('income')
  }


  function onAddExpenseHandler(description, amount) {
    // const oldExpense = [...expenses];

    const newExpense = {
      id: uniqid(),
      type: "expense",
      amount: amount,
      description: description
    };

    // const newExpenses = oldExpense.concat(newExpense);
    const newExpenses = [...expenses ,newExpense];

    setExpense(newExpenses);
  }

  function onAddIncomeHandler(description, amount) {
    const newIncome = {
      id: uniqid(),
      type: 'income',
      amount: amount,
      description: description
    };

    const newIncomes = [...incomes, newIncome];

    setIncome(newIncomes);

  }

  const transaction = [...expenses, ...incomes];


  // delete

  const onRemoveTransactionHandler = (type, id) => {
    if (type === 'expense') {
      const oldExpenses = [...expenses]
      const newExpenses = oldExpenses.filter(items => items.id !== id);

      setExpense(newExpenses)

    }

    if (type === 'income') {
      const oldIncomes = [...incomes];
      const newIncomes = oldIncomes.filter(items => items.id !== id);

      setIncome(newIncomes);

    }
  }



 







  return (
    <div className="App">
      <Header />
      {isModalOpen && <Modal
        setIsModalOpen={setIsModalOpen}
        modalRequestType={modalRequestType}
        onAddExpenseHandler={onAddExpenseHandler}
        onAddIncomeHandler={onAddIncomeHandler}
      />}
      <div className="content">
        <div className="boxes-wrapper">
          <div className="box-expense" onClick={() => expenseBoxClick()}>
            <GiPayMoney size={100} color="red" />
            Add Expense
          </div>
          <div className="box-income" onClick={() => incomeBoxClick()}>
            <GiReceiveMoney size={100} color='green' />
            Add Income
          </div>
        </div>

        <div className="transactions-wrap">
          {transaction.length > 0 ? <h1>All Transactions</h1> : <div className="box-no-transaction">
            <GrNotes size={100} color='green' />
            No Transactions
          </div>}
          {transaction.map(transaction => (
            <div key={transaction.id} className="transaction" style={{
              width: '60%',
              height: '50px',
              padding: '20px',
              marginTop: '20px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '24px',
              background: transaction.type === 'expense' ? 'red' : 'green',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
              onClick={() => onRemoveTransactionHandler(transaction.type, transaction.id)}
            >

              <div >{transaction.amount}</div>
              <div >{transaction.description}</div>

            </div>
          ))}

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
