import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Button, Box } from '@mui/material';
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
 * 
 * UPDATE: Now with emergency kill switch for sanity restoration
 */

const KILL_SWITCH_KEY = 'popupsAndClippyDisabled';

function App() {
  const [isAnnoyanceDisabled, setIsAnnoyanceDisabled] = useState(() => {
    return localStorage.getItem(KILL_SWITCH_KEY) === 'true';
  });

  const handleKillSwitch = () => {
    localStorage.setItem(KILL_SWITCH_KEY, 'true');
    setIsAnnoyanceDisabled(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankAccountsPage />} />
      </Routes>
      
      {/* Emergency Kill Switch - For when you've had enough */}
      {!isAnnoyanceDisabled && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={handleKillSwitch}
            sx={{
              fontWeight: 'bold',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              '&:hover': {
                backgroundColor: '#d32f2f',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s',
            }}
          >
            🚨 KILL ALL POPUPS FOREVER 🚨
          </Button>
        </Box>
      )}
      
      {/* The feature nobody asked for but everyone gets anyway */}
      {!isAnnoyanceDisabled && <ClippyAssistant />}
      
      {/* The feature that will make users uninstall this app immediately */}
      {/* But you specifically asked for this, so here we go... */}
      {!isAnnoyanceDisabled && <AnnoyingPopupManager />}
    </Router>
  );
}

export default App;
