import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:8080/api";

// --- NEW SMART COMPONENT FOR THE SIDEBAR ---
function FavoriteItem({ fav, players, onRemove }) {
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    // 1. Check if the player is currently in the main list
    const existingPlayer = players.find(p => p.id === fav.cricketerId);
    
    if (existingPlayer) {
      setName(existingPlayer.name);
    } else {
      // 2. If not in the list, fetch their name directly from the API!
      fetch(`${API_BASE}/cricketers/${fav.cricketerId}`)
        .then(res => res.json())
        .then(json => {
          if (json.data && json.data.name) setName(json.data.name);
          else setName(fav.cricketerId); // Fallback
        })
        .catch(() => setName(fav.cricketerId));
    }
  }, [fav.cricketerId, players]);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center border-bottom">
      <span className="text-truncate me-2">{name}</span>
      <button className="btn btn-sm btn-danger py-0 px-2" onClick={() => onRemove(fav.cricketerId)} title="Remove">
        &times;
      </button>
    </li>
  );
}
// -------------------------------------------

export default function Dashboard({ user, setUser }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const fetchPlayers = (query = "") => {
    setIsSearching(true);
    const url = query ? `${API_BASE}/cricketers?search=${query}` : `${API_BASE}/cricketers`;
    
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setPlayers(json.data || []); 
        setLoading(false);
        setIsSearching(false);
      })
      .catch(err => {
        console.error("Error fetching players:", err);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPlayers(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchPlayers(""); 
  };

  const handleAddFavorite = async (cricketerId) => {
    try {
      const response = await fetch(`${API_BASE}/users/${user.id}/favorites/${cricketerId}`, { method: "POST" });
      if (response.ok) {
        setUser(await response.json());
      }
    } catch (err) {
      console.error("Error saving favorite:", err);
    }
  };

  // NEW: Function to remove a favorite
  const handleRemoveFavorite = async (cricketerId) => {
    try {
      const response = await fetch(`${API_BASE}/users/${user.id}/favorites/${cricketerId}`, { method: "DELETE" });
      if (response.ok) {
        setUser(await response.json());
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const isFavorited = (cricketerId) => {
    return user.favorites.some(fav => fav.cricketerId === cricketerId);
  };

  const handleViewProfile = async (cricketerId) => {
    setLoadingProfile(true);
    setSelectedProfile({ id: cricketerId }); 
    try {
      const res = await fetch(`${API_BASE}/cricketers/${cricketerId}`);
      const json = await res.json();
      setSelectedProfile(json.data); 
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div className="row position-relative">
      
      {/* Left Column: Master List */}
      <div className="col-md-8">
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-body">
            <form onSubmit={handleSearchSubmit} className="d-flex">
              <input type="text" className="form-control me-2" placeholder="Search for a player..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit" className="btn btn-primary me-2" disabled={isSearching}>{isSearching ? '...' : 'Search'}</button>
              {searchTerm && <button type="button" className="btn btn-outline-secondary" onClick={handleClearSearch}>Clear</button>}
            </form>
          </div>
        </div>

        <h4 className="mb-3">Available Players</h4>
        <div className="row g-3">
          {players.length === 0 && !isSearching ? (
             <div className="text-muted">No players found.</div>
          ) : (
            players.map(player => (
              <div className="col-md-6" key={player.id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex align-items-center">
                    <img src={player.playerImg || 'https://h.cricapi.com/img/icon512.png'} alt={player.name} className="rounded-circle me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <div>
                      <h6 className="mb-0">{player.name}</h6>
                      <small className="text-muted">{player.country}</small>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-0 d-flex justify-content-between">
                    <button className="btn btn-sm btn-info text-white" onClick={() => handleViewProfile(player.id)}>View Profile</button>
                    <button className={`btn btn-sm ${isFavorited(player.id) ? 'btn-success disabled' : 'btn-outline-primary'}`} onClick={() => handleAddFavorite(player.id)}>
                      {isFavorited(player.id) ? 'Favorited ✓' : '+ Favorite'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column: User's Favorites */}
      <div className="col-md-4">
        <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
          <div className="card-header bg-primary text-white border-0">
            <h5 className="mb-0">My Favorites</h5>
          </div>
          <ul className="list-group list-group-flush">
            {user.favorites.length === 0 ? (
              <li className="list-group-item text-muted text-center py-4 border-0">No favorites yet.</li>
            ) : (
              user.favorites.map(fav => (
                <FavoriteItem 
                  key={fav.id} 
                  fav={fav} 
                  players={players} 
                  onRemove={handleRemoveFavorite} 
                />
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white border-0">
                <h5 className="modal-title">Player Profile</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedProfile(null)}></button>
              </div>
              <div className="modal-body text-center">
                {loadingProfile || !selectedProfile.name ? (
                   <div className="spinner-border text-info my-4" />
                ) : (
                  <>
                    <img src={selectedProfile.playerImg || 'https://h.cricapi.com/img/icon512.png'} alt={selectedProfile.name} className="img-fluid rounded-circle mb-3 shadow-sm" style={{ width: '120px' }} />
                    <h4>{selectedProfile.name}</h4>
                    <p className="text-muted mb-1">{selectedProfile.country} • {selectedProfile.role || 'Player'}</p>
                    <p className="mb-3"><strong>Batting:</strong> {selectedProfile.battingStyle || "N/A"}</p>
                    {selectedProfile.stats && selectedProfile.stats.length > 0 && (
                      <div className="text-start bg-light p-3 rounded mt-3 shadow-sm" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <h6 className="border-bottom pb-2 mb-3">Recent Stats Highlights</h6>
                        <ul className="list-unstyled mb-0">
                          {selectedProfile.stats.slice(0, 5).map((stat, index) => (
                            <li key={index} className="small mb-2 d-flex justify-content-between border-bottom pb-1">
                              <span className="text-muted">{stat.matchtype.toUpperCase()} {stat.stat}:</span> 
                              <strong>{stat.value}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}