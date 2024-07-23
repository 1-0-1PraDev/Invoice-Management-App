import { useParams, useNavigate, Link } from 'react-router-dom';
import './InvoiceDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import invoiceSlice from '../redux/invoiceSlice';
import DeleteModal from '../components/Modals/DeleteModal';

const InvoiceDetails = () => {
    const { id } = useParams();
    const invoices = useSelector((state) => state.invoices.invoices);
    const invoice = invoices.find((invoice) => invoice.id === id);
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [invoiceTobeDeleted, setInvoiceTobeDeleted] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteClick = (invoiceId) => {
        if (invoiceId) {
            setInvoiceTobeDeleted(invoiceId);
            setDeleteModalVisible(true);
        }
    }

    const handleDeleteConfirm = () => {
        if (invoiceTobeDeleted) {
            dispatch(invoiceSlice.actions.deleteInvoice({ id: invoiceTobeDeleted }));
            setDeleteModalVisible(false);
            setInvoiceTobeDeleted(null);
            navigate('/');
        }
    }

    const handleDeleteCancel = () => {
        console.log('cancel')
        setInvoiceTobeDeleted(null);
        setDeleteModalVisible(false);
    }

    const handleButtonClick = (id) => {
        console.log('clicked clicked')
        if (id) {
            dispatch(invoiceSlice.actions.setInvoicePaidStatus({ id }));
        }
    }
    console.log(invoice)

    return (
        <div className='invoice-details-container'>
            <Link to={-1} style={{textDecoration: "none"}}>
                <span className='go-back-link'>{"<"} Go Back</span>
            </Link>

            <div className="topBar">
                <div className="leftBx">
                    <span>Status</span>
                    <div
                        className={`payment-status-tag ${invoice.isPaid ? 'status-paid' : 'status-pending'}`}
                    >
                        {invoice.isPaid ? 'Paid' : 'Pending'}
                    </div>
                </div>
                <div className="rightBx">
                    <button className="btn" onClick={() => setIsEditMode(true)}>Edit</button>
                    <button className="btn" onClick={() => handleDeleteClick(id)}>Delete</button>
                    <button className="btn mark-as-paid-btn" onClick={() => handleButtonClick(id)}>Mark as Paid</button>
                </div>
            </div>

            <div className="invoice-details">
                <div className="addressBx">
                    <div className="leftBx">
                        <h3>#{invoice.id}</h3>
                        <p className='project-desc'>{invoice.projectDescription}</p>
                    </div>
                    <div className="rightBx">
                        <span>{invoice.transactionDetails?.[0].details?.streetAddress}</span>
                        <span>{invoice.transactionDetails?.[0].details?.city}</span>
                        <span>{invoice.transactionDetails?.[0].details?.postCode}</span>
                        <span>{invoice.transactionDetails?.[0].details?.country}</span>
                    </div>
                </div>
                <div className="detailsBx">
                    <div className="box">
                        <div>
                            <span>Invoice Date</span>
                            <h3>{invoice.issueDate}</h3>
                        </div>
                        <div>
                            <span>Payment Due</span>
                            <h3>16 Apr 2024</h3>
                        </div>
                    </div>
                    <div className="box">
                        <span>Bill To</span>
                        <h3>{invoice.transactionDetails?.[1].details?.name}</h3>
                        <span>{invoice.transactionDetails?.[1].details?.streetAddress}</span>
                        <span>{invoice.transactionDetails?.[1].details?.city}</span>
                        <span>{invoice.transactionDetails?.[1].details?.postCode}</span>
                        <span>{invoice.transactionDetails?.[1].details?.country}</span>
                    </div>
                    <div className="box">
                        <span>Sent to</span>
                        <h3>{invoice.transactionDetails?.[1].details?.email}</h3>
                    </div>
                </div>

                <div className="items-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>QTY.</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items?.length > 0 && invoice.items?.map((item) => (
                                <tr>
                                    <td><strong>{item.name}</strong></td>
                                    <td>{item.quantity}</td>
                                    <td>$ {item.price}</td>
                                    <td><strong>$ {item.total}</strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="amountBx">
                        <h2>Amount Due</h2>
                        <h2>$ {invoice.items?.reduce((acc, item) => {
                            return acc + Number.parseFloat(item.total);
                        }, 0)}</h2>
                    </div>
                </div>
            </div>

            {deleteModalVisible && (<DeleteModal
                handleDeleteConfirm={handleDeleteConfirm}
                handleDeleteCancel={handleDeleteCancel}
            />)}

            {isEditMode
                && <Sidebar invoiceId={id} setIsEditMode={setIsEditMode}
                />}
        </div>
    )
}

export default InvoiceDetails;