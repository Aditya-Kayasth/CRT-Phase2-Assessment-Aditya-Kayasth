import { useState, useEffect } from 'react';
import api from '../services/api';

export default function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        api.get('/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = { name: name, email: email };

        api.post('/customers', newCustomer)
            .then(() => {
                setStatusMessage('Customer registered successfully!');
                setName('');
                setEmail('');
                fetchCustomers();
                // Clear message after 3 seconds
                setTimeout(() => setStatusMessage(''), 3000); 
            })
            .catch(() => setStatusMessage('Registration failed.'));
    };

    // NEW: The Delete Function
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this customer?")) {
            api.delete(`/customers/${id}`)
                .then(() => {
                    fetchCustomers(); // Refresh the table
                })
                .catch(error => console.error("Error deleting customer:", error));
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-light">👥 Customer Hub</h1>
            
            <div className="row">
                {/* Left Column: Form */}
                <div className="col-md-4">
                    <div className="card bg-dark text-light border-secondary shadow">
                        <div className="card-header border-secondary">
                            <h4 className="mb-0">Register Customer</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control bg-secondary text-light border-0" 
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control bg-secondary text-light border-0" 
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>
                            {statusMessage && (
                                <div className="alert alert-success mt-3 py-2" role="alert">
                                    {statusMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Table */}
                <div className="col-md-8">
                    <div className="card bg-dark text-light border-secondary shadow">
                        <div className="card-body">
                            <table className="table table-dark table-striped table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted py-4">No customers found.</td>
                                        </tr>
                                    ) : (
                                        customers.map(customer => (
                                            <tr key={customer.id} className="align-middle">
                                                <td>{customer.id}</td>
                                                <td>{customer.name}</td>
                                                <td>{customer.email}</td>
                                                <td className="text-end">
                                                    <button 
                                                        onClick={() => handleDelete(customer.id)} 
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}