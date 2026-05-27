import { useState } from 'react';
import Auth from './Auth';
import Dashboard from './Dashboard';

function App() {
  // If user is null, they aren't logged in. If it holds an object, they are!
  const [user, setUser] = useState(null);

  return (
    <div className="bg-light min-vh-100">
      {/* Navigation Bar */}
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">🏏 Cricket Platform</span>
          {user && (
            <button className="btn btn-outline-light btn-sm" onClick={() => setUser(null)}>
              Logout ({user.username})
            </button>
          )}
        </div>
      </nav>

      {/* The Stage Controller */}
      <div className="container">
        {!user ? (
          <Auth onLogin={setUser} /> 
        ) : (
          <Dashboard user={user} setUser={setUser} />
        )}
      </div>
    </div>
  );
}

export default App;