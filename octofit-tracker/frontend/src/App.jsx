import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Dashboard() {
  return (
    <div className="row g-4">
      {navigation
        .filter((item) => item.to !== '/')
        .map((item) => (
          <div key={item.to} className="col-md-6 col-xl-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h4 mb-3">{item.label}</h2>
                <p className="text-muted mb-3">
                  Monitor the latest {item.label.toLowerCase()} data from the OctoFit Tracker API.
                </p>
                <NavLink className="btn btn-primary" to={item.to}>
                  Open {item.label}
                </NavLink>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4 border-bottom pb-3">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold mb-1">OctoFit Tracker</p>
            <h1 className="h2 mb-0">Student fitness dashboard</h1>
          </div>
          <nav className="nav nav-pills flex-wrap gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
