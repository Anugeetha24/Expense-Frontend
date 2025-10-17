import React, { useState, useEffect } from 'react';
import authService from '../services/auth';
import AddTransaction from './AddTransaction';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    income: '',
    savings: '',
    targetExpenses: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${authService.API_BASE}/profile`, {
        headers: {
          ...authService.authHeader()
        }
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${authService.API_BASE}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.authHeader()
        },
        body: JSON.stringify(profile)
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await fetch(`${authService.API_BASE}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authService.authHeader()
        },
        body: JSON.stringify(transaction)
      });
      
      if (!response.ok) throw new Error('Failed to add transaction');
      
      const newTransaction = await response.json();
      setTransactions(prev => [...prev, newTransaction]);
      setSuccess('Transaction added successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <div className="section">
        <h3>Financial Overview</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Monthly Income:</label>
            <input
              type="number"
              name="income"
              value={profile.income}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Monthly Savings Target:</label>
            <input
              type="number"
              name="savings"
              value={profile.savings}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Monthly Target Expenses:</label>
            <input
              type="number"
              name="targetExpenses"
              value={profile.targetExpenses}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="section">
        <div className="section-header">
          <h3>Transactions</h3>
          <button 
            className="add-transaction-button"
            onClick={() => setShowAddTransaction(true)}
          >
            Add Transaction
          </button>
        </div>
        
        <div className="transactions-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-amount">
                ${transaction.amount}
              </div>
              <div className="transaction-details">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-category">{transaction.category}</div>
              </div>
              <div className="transaction-date">
                {new Date(transaction.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddTransaction && (
        <AddTransaction
          onClose={() => setShowAddTransaction(false)}
          onSave={handleAddTransaction}
        />
      )}
    </div>
  );
}

export default Profile;