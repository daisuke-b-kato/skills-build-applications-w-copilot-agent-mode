import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchWorkouts() {
      try {
        // Fetch from API: -8000.app.github.dev/api/workouts
        const response = await fetch(getApiBaseUrl('workouts'));
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

    fetchWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Workouts</h2>
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12 text-center text-muted">No workouts available.</div>
          ) : (
            items.map((workout) => (
              <div key={workout._id ?? workout.title} className="col-md-6 col-xl-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <span className="badge bg-success-subtle text-success mb-2">{workout.difficulty}</span>
                    <h3 className="h5">{workout.title}</h3>
                    <p className="text-muted mb-2">{workout.focus}</p>
                    <ul className="small mb-0">
                      <li>{workout.durationMinutes} minutes</li>
                      <li>{workout.equipment?.join(', ') || 'No equipment required'}</li>
                    </ul>
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

export default Workouts;
