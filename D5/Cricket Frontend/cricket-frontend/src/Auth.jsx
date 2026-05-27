import { useState } from 'react';

const API_BASE = "http://localhost:8080/api/users";

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    const endpoint = isRegister ? "/register" : "/login";

    try {
      const response = await fetch(API_BASE + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      // 1. If the response fails, let's catch the exact message from Spring Boot!
      if (!response.ok) {
        let errorMessage = "Authentication failed";
        try {
            // Try to parse Spring Boot's JSON error (from your GlobalExceptionHandler)
            const errData = await response.json();
            errorMessage = errData.message || errData.error || errorMessage;
        } catch {
            // If it's a plain text error (like "Username already exists")
            errorMessage = await response.text() || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const userData = await response.json();
      onLogin(userData); 
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="text-center mb-4">{isRegister ? "Create Account" : "Welcome Back"}</h3>
            
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              
              <button type="submit" className="btn btn-primary w-100 mb-3">
                {isRegister ? "Register" : "Login"}
              </button>
            </form>

            <div className="text-center">
              <button className="btn btn-link text-decoration-none" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Already have an account? Login" : "Need an account? Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}