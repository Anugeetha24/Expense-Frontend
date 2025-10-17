import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';
import AddTransaction from './AddTransaction';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Sample data for the charts
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Spending',
        data: [2100, 2300, 2000, 2450, 2300, 2450],
        borderColor: '#4CAF50',
        tension: 0.4
      }
    ]
  };

  const categoryData = {
    food: 1200,
    transport: 800,
    entertainment: 400,
    utilities: 600
  };

  const incomeVsExpenses = {
    income: 5500,
    expenses: 3000
  };

  const handleSaveTransaction = (transaction) => {
    console.log('New transaction:', transaction);
    setTransactions(prev => [...prev, transaction]);
    setShowAddTransaction(false);
    // Here you can add API call to save transaction to backend
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2>Spending</h2>
          <button 
            className="add-transaction-btn"
            onClick={() => setShowAddTransaction(true)}
          >
            + Add Transaction
          </button>
        </div>
        <div className="monthly-total">
          <div>
            <h3>Monthly Spending</h3>
            <p className="amount">$2,450</p>
            <p className="trend positive">Last 6 Months +12%</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Monthly Spending Chart */}
        <div className="card chart-card">
          <Line
            data={monthlyData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>

        {/* Category Spending */}
        <div className="card">
          <h3>Category Spending</h3>
          <div className="category-list">
            {Object.entries(categoryData).map(([category, amount]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-amount">${amount}</span>
                <div className="category-bar">
                  <div
                    className="category-bar-fill"
                    style={{
                      width: `${(amount / 3000) * 100}%`,
                      backgroundColor: category === 'food' ? '#4CAF50' : '#2196F3'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="card">
          <h3>Income vs. Expenses</h3>
          <div className="comparison">
            <div className="metric">
              <span>Income</span>
              <span className="amount">${incomeVsExpenses.income}</span>
              <div className="trend-bar positive" style={{ width: '100%' }} />
            </div>
            <div className="metric">
              <span>Expenses</span>
              <span className="amount">${incomeVsExpenses.expenses}</span>
              <div
                className="trend-bar negative"
                style={{ width: `${(incomeVsExpenses.expenses / incomeVsExpenses.income) * 100}%` }}
              />
            </div>
            <p className="trend negative">This Month -3%</p>
          </div>
        </div>
      </div>

      {showAddTransaction && (
        <AddTransaction 
          onClose={() => setShowAddTransaction(false)}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
}