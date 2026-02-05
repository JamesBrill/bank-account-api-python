import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BankAccountsPage from './pages/BankAccountsPage';
import ClippyAssistant from './components/ClippyAssistant';
import AnnoyingPopupManager from './components/AnnoyingPopupManager';

/**
 * Oh, you wanted ENDLESS ANNOYING POPUPS? 
 * Say no more. Say absolutely no more.
 * 
 * This app now features:
 * - Clippy (already annoying)
 * - AnnoyingPopupManager (exponentially more annoying)
 * - Your banking needs (completely ignored)
 * 
 * User experience rating: -47/10
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankAccountsPage />} />
      </Routes>
      
      {/* The feature nobody asked for but everyone gets anyway */}
      <ClippyAssistant />
      
      {/* The feature that will make users uninstall this app immediately */}
      {/* But you specifically asked for this, so here we go... */}
      <AnnoyingPopupManager />
    </Router>
  );
}

export default App;
