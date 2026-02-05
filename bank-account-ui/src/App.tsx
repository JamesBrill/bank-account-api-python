import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BankAccountsPage from './pages/BankAccountsPage';
import ClippyAssistant from './components/ClippyAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankAccountsPage />} />
      </Routes>
      {/* The feature nobody asked for but everyone gets anyway */}
      <ClippyAssistant />
    </Router>
  );
}

export default App;
