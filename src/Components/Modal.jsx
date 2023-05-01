import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Modal({ setIsModalOpen, modalRequestType, onAddExpenseHandler, onAddIncomeHandler }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const inputRef = useRef();

  const buttonHandler = () => {
    if (!amount && !description) {
      return;
    }


    if (modalRequestType === 'expense') {
      onAddExpenseHandler(amount , description)
    }

    if (modalRequestType === 'income') {
      onAddIncomeHandler(amount , description)
    }

    setIsModalOpen(false);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);


  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <AiFillCloseCircle size={35} className='closeBtn' onClick={() => setIsModalOpen(false)} />
          <h2>{modalRequestType === 'income' ? 'Add Income' : 'Add Expense'}</h2>
          <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} ref={inputRef} />
          <input type="text" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button onClick={buttonHandler} type="button">{modalRequestType === 'income' ? 'Add Income' : 'Add Expense'}</button>
        </div>
      </div>
    </>
  )
}
