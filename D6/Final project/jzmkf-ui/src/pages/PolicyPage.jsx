import { useState, useEffect } from 'react';
import api from '../services/api';

export default function PolicyPage() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [customerPolicies, setCustomerPolicies] = useState([]);

    // Form state
    const [policyType, setPolicyType] = useState('Life');
    const [premiumAmount, setPremiumAmount] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    // Fetch customers for the dropdown when the page loads
    useEffect(() => {
        api.get('/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));
    }, []);

    // Automatically fetch policies whenever a new customer is selected from the dropdown
    useEffect(() => {
        if (selectedCustomerId) {
            api.get(`/policies/customer/${selectedCustomerId}`)
                .then(response => setCustomerPolicies(response.data))
                .catch(error => console.error("Error fetching policies:", error));
        } else {
            setCustomerPolicies([]);
        }
    }, [selectedCustomerId]);

    const handleIssuePolicy = (e) => {
        e.preventDefault();
        setStatusMessage('Issuing...');

        const newPolicy = {
            customerId: selectedCustomerId,
            policyType: policyType,
            premiumAmount: parseFloat(premiumAmount)
        };

        api.post('/policies', newPolicy)
            .then(response => {
                setStatusMessage(`Success! Policy ID ${response.data.id} issued.`);
                setPremiumAmount('');
                
                // Refresh the table to show the newly added policy
                api.get(`/policies/customer/${selectedCustomerId}`)
                    .then(res => setCustomerPolicies(res.data));
            })
            .catch(error => {
                console.error("Error issuing policy:", error);
                setStatusMessage('Issue failed. Check console.');
            });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Policy Management Dashboard</h1>
            
            <div style={{ display: 'flex', gap: '40px' }}>
                {/* Left Side: The Form */}
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '300px' }}>
                    <h3>Issue New Policy</h3>
                    <form onSubmit={handleIssuePolicy} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        
                        <select 
                            value={selectedCustomerId} 
                            onChange={(e) => setSelectedCustomerId(e.target.value)} 
                            required
                            style={{ padding: '8px' }}
                        >
                            <option value="">-- Select a Customer --</option>
                            {customers.map(c => (
                                <option key={c.id} value={c.id}>{c.name} (ID: {c.id})</option>
                            ))}
                        </select>

                        <select 
                            value={policyType} 
                            onChange={(e) => setPolicyType(e.target.value)}
                            style={{ padding: '8px' }}
                        >
                            <option value="Life">Life Insurance</option>
                            <option value="Comprehensive Health">Comprehensive Health</option>
                            <option value="Auto">Auto Insurance</option>
                        </select>

                        <input 
                            type="number" 
                            placeholder="Premium Amount (₹)" 
                            value={premiumAmount}
                            onChange={(e) => setPremiumAmount(e.target.value)}
                            required 
                            style={{ padding: '8px' }}
                        />
                        
                        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px' }}>
                            Issue Policy
                        </button>
                    </form>
                    <p style={{ color: 'green', fontSize: '14px', marginTop: '10px' }}>{statusMessage}</p>
                </div>

                {/* Right Side: Data Table */}
                <div>
                    <h3>{selectedCustomerId ? "Customer Policies" : "Select a customer to view policies"}</h3>
                    {selectedCustomerId && (
                        <table style={{ borderCollapse: 'collapse', width: '500px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Policy ID</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerPolicies.map(policy => (
                                    <tr key={policy.id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px' }}>{policy.id}</td>
                                        <td style={{ padding: '8px' }}>{policy.policyType}</td>
                                        <td style={{ padding: '8px' }}>₹{policy.premiumAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {selectedCustomerId && customerPolicies.length === 0 && <p>This customer has no active policies.</p>}
                </div>
            </div>
        </div>
    );
}