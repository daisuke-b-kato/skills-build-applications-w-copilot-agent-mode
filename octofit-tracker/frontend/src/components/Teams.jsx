import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchTeams() {
      try {
        const response = await fetch(getApiBaseUrl('teams'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        if (isMounted) {
          setItems(normalizeCollection(payload));
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Teams</h2>
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12 text-center text-muted">No teams available.</div>
          ) : (
            items.map((team) => (
              <div key={team._id ?? team.name} className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <span className="badge bg-primary-subtle text-primary mb-2">{team.focus ?? 'Team'}</span>
                    <h3 className="h5">{team.name}</h3>
                    <p className="text-muted">{team.description}</p>
                    <div>
                      <strong>Members:</strong> {team.members?.length ?? 0}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
