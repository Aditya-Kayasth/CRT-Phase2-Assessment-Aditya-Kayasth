import { useState } from 'react';
import api from '../services/api';

export default function ClaimPage() {
    // We will search for claims by Policy ID
    const [searchPolicyId, setSearchPolicyId] = useState('');
    const [claims, setClaims] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Form state for filing a new claim
    const [policyId, setPolicyId] = useState('');
    const [description, setDescription] = useState('');
    const [claimAmount, setClaimAmount] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const fetchClaimsByPolicy = (e) => {
        if (e) e.preventDefault();
        api.get(`/claims/policy/${searchPolicyId}`)
            .then(response => {
                setClaims(response.data);
                setHasSearched(true);
            })
            .catch(error => {
                console.error("Error fetching claims:", error);
                setClaims([]);
                setHasSearched(true);
            });
    };

    const handleFileClaim = (e) => {
        e.preventDefault();
        setStatusMessage('Filing claim...');

        const newClaim = {
            policyId: parseInt(policyId),
            description: description,
            claimAmount: parseFloat(claimAmount)
        };

        api.post('/claims', newClaim)
            .then(response => {
                setStatusMessage(`Success! Claim ID ${response.data.id} filed and is PENDING.`);
                setDescription('');
                setClaimAmount('');
                
                // If the user is currently viewing the claims for this policy, refresh the table
                if (searchPolicyId === policyId) {
                    fetchClaimsByPolicy();
                }
            })
            .catch(error => {
                console.error("Error filing claim:", error);
                setStatusMessage('Filing failed. Ensure Policy ID exists.');
            });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Claims Processing Center</h1>
            
            <div style={{ display: 'flex', gap: '40px' }}>
                {/* Left Side: File a Claim Form */}
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '300px' }}>
                    <h3>File a Claim</h3>
                    <form onSubmit={handleFileClaim} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input 
                            type="number" 
                            placeholder="Policy ID" 
                            value={policyId}
                            onChange={(e) => setPolicyId(e.target.value)}
                            required 
                            style={{ padding: '8px' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Claim Description (e.g., Accident)" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required 
                            style={{ padding: '8px' }}
                        />
                        <input 
                            type="number" 
                            placeholder="Claim Amount (₹)" 
                            value={claimAmount}
                            onChange={(e) => setClaimAmount(e.target.value)}
                            required 
                            style={{ padding: '8px' }}
                        />
                        
                        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
                            Submit Claim
                        </button>
                    </form>
                    <p style={{ color: 'green', fontSize: '14px', marginTop: '10px' }}>{statusMessage}</p>
                </div>

                {/* Right Side: Search & Data Table */}
                <div>
                    <h3>View Policy Claims</h3>
                    <form onSubmit={fetchClaimsByPolicy} style={{ marginBottom: '20px' }}>
                        <input 
                            type="number" 
                            placeholder="Enter Policy ID..." 
                            value={searchPolicyId}
                            onChange={(e) => setSearchPolicyId(e.target.value)}
                            required 
                            style={{ padding: '8px', marginRight: '10px' }}
                        />
                        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Search</button>
                    </form>

                    {hasSearched && (
                        <table style={{ borderCollapse: 'collapse', width: '500px' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Claim ID</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Amount</th>
                                    <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claims.map(claim => (
                                    <tr key={claim.id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px' }}>{claim.id}</td>
                                        <td style={{ padding: '8px' }}>{claim.description}</td>
                                        <td style={{ padding: '8px' }}>₹{claim.claimAmount}</td>
                                        <td style={{ padding: '8px', fontWeight: 'bold', color: claim.status === 'PENDING' ? 'orange' : 'inherit' }}>
                                            {claim.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {hasSearched && claims.length === 0 && <p>No claims found for this Policy ID.</p>}
                </div>
            </div>
        </div>
    );
}