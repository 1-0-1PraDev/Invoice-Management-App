import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import illustrationImg from '../../../src/img/illustration.svg';
import './Main.css';

const Main = ({ setIsSideBarOpen }) => {
  const invoices = useSelector((state) => state.invoices.invoices);
  const [isPending, setIsPending] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    if (!isPending && !isPaid) {
      return true;
    }

    if (isPaid) {
      return invoice.isPaid;
    }

    if (isPending) {
      return !invoice.isPaid;
    }
  });

  const filterArrowIconStyle = {
    transition: '0.54s', 
    transform: isFilterOpen && 'rotate(180deg)'
  }

  return (
    <div className='main'>
      <div className="topBar">
        <div className="leftBx">
          <h2>Invoices</h2>
          <span>There are {invoices.length} total invoices</span>
        </div>
        <div className="rightBx">
          {/* filter by paid status */}
          <div className="filterBx">
            <p onClick={() => setIsFilterOpen((prevState) => !prevState)} >Filter by status <i class="fa-solid fa-chevron-down" style={filterArrowIconStyle}></i></p>
            {isFilterOpen && (<div className="filter-wrapper">
              <div className="filter-box">
                <input
                  type="checkbox"
                  id='paid'
                  name='paid'
                  value='paid'
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                />{" "}
                <label htmlFor="paid">Paid</label>
              </div>
              <div className="filter-box">
                <input
                  type="checkbox"
                  id='pending'
                  name='pending'
                  value='pending'
                  checked={isPending}
                  onChange={(e) => setIsPending(e.target.checked)}
                />{" "}
                <label htmlFor="pending">Pending</label>
              </div>
            </div>
            )}
          </div>

          <button
            className="btn add-invoice-btn"
            onClick={() => setIsSideBarOpen(true)}
          >
            <span>+</span>
            New Invoice
          </button>
        </div>
      </div>

      <div className='invoices-cards'>
        {filteredInvoices.length > 0 ? (filteredInvoices.map((invoice, ind) => {
          return (
            <Link to={`invoice/${invoice.id}`} style={{ textDecoration: "none" }}>
              <div className="invoice-card">
                <h2 className='invoice-id'>
                  <span># <b>{invoice.id.toString().slice(0, 12)}</b></span>
                </h2>
                <p className='invoice-date'>{invoice.issueDate}</p>
                <p className='invoice-name'>{invoice.transactionDetails[1].details.name}</p>
                <p className="invoice-price"> $
                  {invoice.items?.reduce((acc, item) => {
                    return acc + Number.parseFloat(item.total);
                  }, 0)}
                </p>
                <p className={`payment-status-tag ${invoice.isPaid ? 'status-paid' : 'status-pending'}`}>{invoice.isPaid ? 'Paid' : 'Pending'}</p>
              </div>
            </Link>
          )
        })) : (
          <div className="noDataBx">
            <p style={{ color: `var(--main-primary-text-color)` }}>No data found!!!</p>
            <img src={illustrationImg} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Main;