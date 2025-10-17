import React, { useState } from 'react';
import './AddTransaction.css';

export default function AddTransaction({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    account: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Utilities',
    'Healthcare',
    'Shopping',
    'Education',
    'Other'
  ];

  const accounts = [
    'Cash',
    'Bank Account',
    'Credit Card',
    'Debit Card'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.amount || !formData.description || !formData.category || !formData.account || !formData.date) {
      alert('Please fill in all fields');
      return;
    }

    // Call onSave callback with form data
    if (onSave) {
      onSave({
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now() // Generate a simple ID
      });
    }

    // Reset form
    setFormData({
      amount: '',
      description: '',
      category: '',
      account: '',
      date: new Date().toISOString().split('T')[0]
    });

    // Close modal if onClose is provided
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="add-transaction-overlay" onClick={onClose}>
      <div className="add-transaction-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        <h2 className="modal-title">Add Transaction</h2>
        
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="account">Account</label>
            <select
              id="account"
              name="account"
              value={formData.account}
              onChange={handleChange}
              required
            >
              <option value="">Select account</option>
              {accounts.map(acc => (
                <option key={acc} value={acc.toLowerCase().replace(' ', '-')}>{acc}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
