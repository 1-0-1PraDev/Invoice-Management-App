import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import invoiceSlice from '../../redux/invoiceSlice';
import { v4 as uuidv4 } from 'uuid';
import './Sidebar.css';

const Sidebar = ({ invoiceId, setIsEditMode, onCloseSidebar, isSideBarOpen }) => {
    const invoices = useSelector((state) => state.invoices.invoices);
    const [currentInvoiceId, setCurrentInvoiceId] = useState(invoiceId);

    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    const [billFromDetails, setBillFromDetails] = useState({
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
    });

    const [billToDetails, setBillToDetails] = useState({
        name: '',
        email: '',
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
    }); 

    const [issueDate, setIssueDate] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [paymentTerm, setPaymentTerm] = useState('');
    const [items, setItems] = useState([]);

    // Fetch invoice details when invoiceId changes
    useEffect(() => {
        if (currentInvoiceId) {
            const selectedInvoice = invoices.find(invoice => invoice.id === currentInvoiceId);
            if (selectedInvoice) {
                setCurrentInvoiceId(invoiceId);
                setBillFromDetails(selectedInvoice.transactionDetails[0]?.details || {});
                setBillToDetails(selectedInvoice.transactionDetails[1]?.details || {});
                setIssueDate(selectedInvoice.issueDate || '');
                setProjectDesc(selectedInvoice.projectDescription || '');
                setPaymentTerm(selectedInvoice.paymentTerm || '');
                setItems(selectedInvoice.items || []);
            }
        }
    }, [currentInvoiceId, invoices]);

    const handleBillFromInput = (e) => {
        setBillFromDetails((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleBillToInput = (e) => {
        setBillToDetails((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleChange = (index, name, value, e) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            const updatedItem = { ...updatedItems[index] };
            updatedItem[name] = value;
            if (name === 'quantity' || name === 'price') {
                const quantity = parseFloat(updatedItem.quantity || 0);
                const price = parseFloat(updatedItem.price || 0);
                updatedItem.total = (price * quantity).toFixed(2);
            }
            updatedItems[index] = updatedItem;
            return updatedItems;
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newInvoice = {
            id: currentInvoiceId || uuidv4(),
            transactionDetails: [
                {
                    name: "bill from",
                    details: billFromDetails
                },
                {
                    name: "bill to",
                    details: billToDetails
                }
            ],
            issueDate,
            paymentTerm,
            projectDescription: projectDesc,
            items: items,
            isPaid: false
        }
        if (currentInvoiceId) {
            dispatch(invoiceSlice.actions.editInvoice({ id: currentInvoiceId, newInvoice }))
        } else {
            dispatch(invoiceSlice.actions.addInvoice(newInvoice))
        }

        if (onCloseSidebar) {
            onCloseSidebar();
        } else {
            setIsEditMode(false);
        }
    }
    console.log('open or not ', isSideBarOpen)

    const handleAddItem = () => {
        const newItem = {
            id: uuidv4(),
            name: '',
            quantity: 0,
            price: 0.00,
            total: ''
        }
        setItems((prevState) => [...prevState, newItem]);
    }

    const handleDeleteItem = (id) => {
        dispatch(invoiceSlice.actions.deleteItem({ id: currentInvoiceId, itemId: id }))
        // Update local state to reflect deletion in UI
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }

    const validateInputField = (e) => {
        setIsError(e.target.value === '');
    }

    return (
        <>
            {setIsEditMode && <div className="sidebar-overlay"></div>}
            <div className='sidebar'>
                <form action="" onSubmit={handleFormSubmit}>
                    <div className="formBx">
                    <h4 className="inputBx-heading">New Invoice</h4>
                        <div className="inputBx">
                        <h4 className="heading">Bill From</h4>
                            <label htmlFor="">Street Address</label>
                            <input
                                type="text"
                                className={`bill-from-street-address ${isError ? 'input-error' : ''}`}
                                name='streetAddress'
                                value={billFromDetails.streetAddress}
                                onChange={handleBillFromInput}
                                onBlur={validateInputField}
                            />
                        </div>
                        <div className="inputBx">
                            <div className="box">
                                <label htmlFor="">City</label>
                                <input
                                    type="text"
                                    className={`bill-from-city ${isError ? 'input-error' : ''}`}
                                    name='city'
                                    value={billFromDetails.city}
                                    onChange={handleBillFromInput}
                                    onBlur={validateInputField}
                                />
                            </div>
                            <div className="box">
                                <label htmlFor="">Post Code</label>
                                <input
                                    type="text"
                                    className='bill-from-post-code'
                                    name='postCode'
                                    value={billFromDetails.postCode}
                                    onChange={handleBillFromInput}
                                    onBlur={validateInputField}
                                />
                            </div>
                            <div className="box">
                                <label htmlFor="">Country</label>
                                <input
                                    type="text"
                                    className='bill-from-country'
                                    name='country'
                                    value={billFromDetails.country}
                                    onChange={handleBillFromInput}
                                    onBlur={validateInputField}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="formBx">
                        <div className="inputBx">
                            <h4 className="heading">Bill To</h4>
                            <label htmlFor="">Client's Name</label>
                            <input
                                type="text"
                                className='bill-to-client-name'
                                name='name'
                                value={billToDetails.name}
                                onChange={handleBillToInput}
                                onBlur={validateInputField}
                            />
                        </div>
                        <div className="inputBx">
                            <label htmlFor="">Client's Email</label>
                            <input
                                type="text"
                                className='bill-to-client-email'
                                placeholder='e.g.email@example.com'
                                name='email'
                                value={billToDetails.email}
                                onChange={handleBillToInput}
                                onBlur={validateInputField}
                            />
                        </div>
                        <div className="inputBx">
                            <label htmlFor="">Street Address</label>
                            <input
                                type="text"
                                className='bill-to-street-address'
                                name='streetAddress'
                                value={billToDetails.streetAddress}
                                onChange={handleBillToInput}
                                onBlur={validateInputField}
                            />
                        </div>
                        <div className="inputBx">
                            <div className="box">
                                <label htmlFor="">City</label>
                                <input
                                    type="text"
                                    className='bill-to-city'
                                    name='city'
                                    value={billToDetails.city}
                                    onChange={handleBillToInput}
                                    onBlur={validateInputField}
                                />
                            </div>
                            <div className="box">
                                <label htmlFor="">Post Code</label>
                                <input
                                    type="text"
                                    className='bill-to-post-code'
                                    name='postCode'
                                    value={billToDetails.postCode}
                                    onChange={handleBillToInput}
                                    onBlur={validateInputField}
                                />
                            </div>
                            <div className="box">
                                <label htmlFor="">Country</label>
                                <input
                                    type="text"
                                    className='bill-to-country'
                                    name='country'
                                    value={billToDetails.country}
                                    onChange={handleBillToInput}
                                    onBlur={validateInputField}
                                />
                            </div>
                        </div>
                        <div className="inputBx">
                            <div className="box">
                                <label htmlFor="">Issue Date</label>
                                <input
                                    type="date"
                                    className='bill-to-issue-date'
                                    onChange={(e) => setIssueDate(e.target.value)}
                                />
                            </div>
                            <div className="box">
                                <label htmlFor="">Payment Terms</label>
                                <select name="" id="" onChange={(e) => setPaymentTerm(e.target.value)}>
                                    {Array.from({ length: 5 }, (item, ind) => (
                                        <option value={ind + 1}>{`Net ${ind + 1} Day`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="inputBx">
                            <label htmlFor="">Project Description</label>
                            <input
                                type="text"
                                className='bill-to-project-desc'
                                value={projectDesc}
                                onChange={(e) => setProjectDesc(e.target.value)}
                                onBlur={validateInputField}
                            />
                        </div>
                        <div className="inputBx">
                            <h3 className='heading'>Item List</h3>
                            {items.map((item, ind) => (
                                <div key={item.id} className="items-container">
                                    <div className="leftBx">
                                        <div className="inputBx">
                                            <label htmlFor="">Item Name</label>
                                            <input
                                                type="text"
                                                className='item-name'
                                                name='name'
                                                value={item.name}
                                                onChange={(e) => handleChange(ind, e.target.name, e.target.value, e)}
                                                onBlur={validateInputField}
                                            />
                                        </div>
                                        <div className="inputBx">
                                            <label htmlFor="">Qty.</label>
                                            <input
                                                type="number"
                                                className='item-quantity'
                                                name='quantity'
                                                value={item.quantity}
                                                onChange={(e) => handleChange(ind, e.target.name, e.target.value, e)}
                                                onBlur={validateInputField}
                                            />
                                        </div>
                                        <div className="inputBx">
                                            <label htmlFor="">Qty.</label>
                                            <input
                                                type="number"
                                                className='item-price'
                                                name='price'
                                                value={item.price}
                                                onChange={(e) => handleChange(ind, e.target.name, e.target.value, e)}
                                                onBlur={validateInputField}
                                            />
                                        </div>
                                        <div className="inputBx">
                                            <label htmlFor="">Total</label>
                                            <span className='item-total-price'>{item.total === '' ? '0.00' : item.total}</span>
                                        </div>
                                    </div>
                                    <div className="rightBx">
                                        {/* Delete icon */}
                                        <i
                                            className="fa-solid fa-trash"
                                            onClick={() => handleDeleteItem(item.id)}
                                        ></i>
                                    </div>
                                </div>
                            ))}

                            <button
                                type='button'
                                className='btn btn-add-item btn-full-length'
                                onClick={handleAddItem}
                            >+Add New Item</button>
                        </div>
                    </div>
                    <div className="btnsBx">
                        {!currentInvoiceId && (
                            <div className="leftBx">
                                <button type='button' className='btn discard-btn' onClick={() => onCloseSidebar()}>Discard</button>
                            </div>
                        )}

                        <div className="rightBx">
                            {currentInvoiceId ? (
                                <>
                                    <button className='btn cancel-btn' onClick={() => setIsEditMode(false)} >Cancel</button>
                                    <button className='btn save-changes-btn' onClick={handleFormSubmit}>Save Changes</button>
                                </>
                            ) : (
                                <>
                                    <button className='btn save-send-btn' type='submit'>Save & Send</button>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Sidebar;