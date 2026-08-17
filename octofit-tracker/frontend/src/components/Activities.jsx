import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchActivities() {
      try {
        // Fetch from API: -8000.app.github.dev/api/activities
        const response = await fetch(getApiBaseUrl('activities'));
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

    fetchActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h3 mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Minutes</th>
                <th>Calories</th>
                <th>Distance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No activities found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id ?? `${item.type}-${item.date}`}>
                    <td>{item.type}</td>
                    <td>{item.durationMinutes}</td>
                    <td>{item.caloriesBurned}</td>
                    <td>{item.distanceKm ?? 0} km</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
