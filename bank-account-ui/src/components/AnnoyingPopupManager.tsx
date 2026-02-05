import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box,
  Alert,
  Snackbar
} from '@mui/material';

/**
 * The Popup Manager from Hell
 * 
 * You asked for this. YOU SPECIFICALLY ASKED FOR THIS.
 * Don't say I didn't warn you when users start filing bug reports.
 * 
 * Features that nobody wanted:
 * - Popups that spawn MORE popups when closed
 * - Random intervals because consistency is for cowards
 * - Fake close buttons that don't actually close anything
 * - Multiple popup types appearing simultaneously
 * - Messages that get progressively more unhinged
 * - Absolutely zero regard for user sanity
 */

interface Popup {
  id: number;
  message: string;
  type: 'alert' | 'confirm' | 'fake' | 'snackbar' | 'trap';
  children?: number; // How many child popups spawn when this closes
}

const OBNOXIOUS_MESSAGES = [
  "🚨 URGENT: Your account balance still exists! This is a popup to inform you of this critical information!",
  "⚠️ WARNING: You are currently using a banking app. Click OK to acknowledge that you know you're using a banking app.",
  "💡 TIP: Did you know you can save time by NOT reading these popups? But you're reading this one, aren't you?",
  "🎉 CONGRATULATIONS! You've been selected to receive... ANOTHER POPUP!",
  "📢 ANNOUNCEMENT: This is an announcement about announcements. We will be making more announcements.",
  "🔔 REMINDER: You have been using this app for approximately... *checks notes* ...some amount of time!",
  "⏰ TIME-SENSITIVE: This message will self-destruct in... actually, no it won't. It's staying forever.",
  "🎯 ACHIEVEMENT UNLOCKED: You've closed 5 popups! Here are 3 more as a reward!",
  "🌟 SPECIAL OFFER: Close this popup and get TWO MORE absolutely FREE!",
  "🎊 BREAKING NEWS: Local user desperately tries to use banking app. Popups have other plans.",
  "🔥 HOT TIP: The close button on this popup is real. The next one? Not so much.",
  "💰 FINANCIAL ADVICE: Stop trying to close popups and just accept your fate.",
  "🎪 WELCOME BACK! Did you miss us? We missed you! (You were gone for 3 seconds)",
  "🌈 MANDATORY FUN: You are required to acknowledge this popup before continuing your misery.",
  "🎭 PLOT TWIST: This popup is actually THREE popups in a trench coat!",
  "🚀 SYSTEM UPDATE: We've updated the popup frequency from 'annoying' to 'absolutely insufferable'.",
  "🎨 UI/UX IMPROVEMENT: We've added more popups based on user feedback. (Nobody asked for this)",
  "🔐 SECURITY ALERT: Your security is important to us. This popup proves it. Close to continue being secure.",
  "📱 MOBILE OPTIMIZATION: This popup has been optimized to cover exactly 100% of your screen!",
  "🎲 RANDOM FACT: 99% of users hate these popups. The 1% are lying.",
  "🏆 LEADERBOARD: You're #1 in popup closures today! Your prize is more popups!",
  "💎 PREMIUM FEATURE: Upgrade to Premium to get... MORE popups! (Not really, you can't escape)",
  "🎵 MUSICAL CHAIRS: Except the music is popups and the chairs are also popups.",
  "🌙 GOOD NIGHT: This popup appears at all hours because sleep is for the weak.",
  "☕ COFFEE BREAK: Take a break! Just kidding, here's 5 more popups.",
  "🎯 TARGETED AD: We know you hate popups. So here's a popup about hating popups!",
  "🔮 PREDICTION: You will close this popup. Then another will appear. We can see the future.",
  "🎪 ENCORE! The audience demanded more popups! (The audience was just us. We're the audience.)",
  "🌊 TSUNAMI WARNING: A wave of popups is approaching. It's already here. You're drowning in it.",
  "🎬 DIRECTOR'S CUT: This popup includes 47 minutes of additional popup footage.",
];

let globalPopupIdCounter = 0;

export default function AnnoyingPopupManager() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [snackbars, setSnackbars] = useState<Array<{id: number, message: string}>>([]);
  const [spawnRate, setSpawnRate] = useState(5000); // Start "reasonable", get worse over time
  const [totalClosed, setTotalClosed] = useState(0);

  // Spawn popups at increasingly ridiculous intervals
  useEffect(() => {
    const spawnPopup = () => {
      const types: Popup['type'][] = ['alert', 'confirm', 'fake', 'trap'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomMessage = OBNOXIOUS_MESSAGES[Math.floor(Math.random() * OBNOXIOUS_MESSAGES.length)];
      
      const newPopup: Popup = {
        id: globalPopupIdCounter++,
        message: randomMessage,
        type: randomType,
        children: Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0, // 50% chance of spawning children
      };

      setPopups(prev => [...prev, newPopup]);

      // 30% chance of also spawning a snackbar because why not
      if (Math.random() > 0.7) {
        setSnackbars(prev => [...prev, {
          id: globalPopupIdCounter++,
          message: "🎉 Bonus popup! This one slides in from the corner!"
        }]);
      }

      // Gradually increase spawn rate (decrease interval) to make it worse over time
      setSpawnRate(prev => Math.max(1000, prev - 200)); // Eventually spawns every second
    };

    const interval = setInterval(spawnPopup, spawnRate);
    return () => clearInterval(interval);
  }, [spawnRate]);

  // Spawn initial popup because we can't waste any time
  useEffect(() => {
    setTimeout(() => {
      setPopups([{
        id: globalPopupIdCounter++,
        message: "🎊 WELCOME! Your banking experience is about to get SIGNIFICANTLY worse!",
        type: 'alert',
        children: 2, // Start with a bang
      }]);
    }, 1000); // Give them 1 second of peace. We're not COMPLETE monsters.
  }, []);

  // Every 10 popup closures, spawn a mega-popup
  useEffect(() => {
    if (totalClosed > 0 && totalClosed % 10 === 0) {
      setPopups(prev => [...prev, {
        id: globalPopupIdCounter++,
        message: `🏆 MILESTONE! You've closed ${totalClosed} popups! Here's 5 more to celebrate!`,
        type: 'confirm',
        children: 5,
      }]);
    }
  }, [totalClosed]);

  const handleClose = (popup: Popup, actuallyClose: boolean = true) => {
    if (actuallyClose) {
      // Remove the popup
      setPopups(prev => prev.filter(p => p.id !== popup.id));
      setTotalClosed(prev => prev + 1);

      // Spawn child popups because we're evil
      if (popup.children && popup.children > 0) {
        const childPopups: Popup[] = [];
        for (let i = 0; i < popup.children; i++) {
          childPopups.push({
            id: globalPopupIdCounter++,
            message: `🎁 SURPRISE! Child popup ${i + 1} of ${popup.children}! You thought you were done?`,
            type: ['alert', 'confirm', 'fake'][Math.floor(Math.random() * 3)] as Popup['type'],
            children: Math.random() > 0.7 ? 1 : 0, // Children can have children. It's the circle of life.
          });
        }
        setPopups(prev => [...prev, ...childPopups]);
      }
    } else {
      // Fake close button - spawn TWO more instead
      setPopups(prev => [...prev.filter(p => p.id !== popup.id), 
        {
          id: globalPopupIdCounter++,
          message: "😈 GOTCHA! That was a fake close button! Here's your punishment!",
          type: 'alert',
          children: 1,
        },
        {
          id: globalPopupIdCounter++,
          message: "🎭 Pro tip: Not all close buttons are real. Good luck figuring out which ones!",
          type: 'trap',
          children: 0,
        }
      ]);
      setTotalClosed(prev => prev + 1);
    }
  };

  const handleSnackbarClose = (id: number) => {
    setSnackbars(prev => prev.filter(s => s.id !== id));
  };

  return (
    <>
      {/* Main Dialog Popups */}
      {popups.map((popup, index) => (
        <Dialog
          key={popup.id}
          open={true}
          onClose={() => {}} // Can't close by clicking outside. Too easy.
          maxWidth="sm"
          fullWidth
          hideBackdrop={true} // No shadow overlay - just raw popups
          sx={{
            // Stack popups with slight offsets so you can see there are multiple
            '& .MuiDialog-paper': {
              position: 'fixed',
              top: `${50 + (index * 30)}px`,
              left: `${50 + (index * 30)}px`,
              transform: 'none',
              margin: 0,
            }
          }}
        >
          <DialogTitle sx={{ 
            backgroundColor: popup.type === 'trap' ? '#ff4444' : '#ffcc00',
            color: popup.type === 'trap' ? 'white' : 'black',
            fontFamily: 'Comic Sans MS, cursive',
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }}>
            {popup.type === 'trap' ? '⚠️ TRAP POPUP ⚠️' : '🚨 IMPORTANT MESSAGE 🚨'}
          </DialogTitle>
          
          <DialogContent sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontFamily: 'Arial, sans-serif', mb: 2 }}>
              {popup.message}
            </Typography>
            
            {popup.children !== undefined && popup.children > 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                ⚠️ Warning: Closing this popup will spawn {popup.children} more popup{popup.children > 1 ? 's' : ''}!
              </Alert>
            )}

            <Box sx={{ mt: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Popups closed today: {totalClosed} | Active popups: {popups.length}
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions>
            {popup.type === 'fake' && (
              <>
                <Button 
                  onClick={() => handleClose(popup, false)}
                  variant="contained"
                  color="error"
                >
                  Close (Real)
                </Button>
                <Button 
                  onClick={() => handleClose(popup, true)}
                  variant="outlined"
                >
                  Close (Fake)
                </Button>
              </>
            )}
            
            {popup.type === 'trap' && (
              <>
                <Button 
                  onClick={() => handleClose(popup, false)}
                  variant="contained"
                >
                  ❌ Close
                </Button>
                <Button 
                  onClick={() => handleClose(popup, false)}
                  variant="contained"
                >
                  ❌ Close
                </Button>
                <Button 
                  onClick={() => handleClose(popup, true)}
                  variant="outlined"
                >
                  ✅ Close
                </Button>
              </>
            )}

            {popup.type === 'alert' && (
              <Button 
                onClick={() => handleClose(popup, true)}
                variant="contained"
                color="primary"
              >
                OK (This spawns {popup.children ?? 0} more)
              </Button>
            )}

            {popup.type === 'confirm' && (
              <>
                <Button 
                  onClick={() => handleClose(popup, true)}
                  variant="contained"
                  color="primary"
                >
                  Yes
                </Button>
                <Button 
                  onClick={() => handleClose(popup, true)}
                  variant="outlined"
                >
                  No
                </Button>
                <Button 
                  onClick={() => handleClose(popup, true)}
                  variant="text"
                >
                  Maybe
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      ))}

      {/* Snackbar Popups */}
      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleSnackbarClose(snackbar.id)}
          anchorOrigin={{ 
            vertical: index % 2 === 0 ? 'top' : 'bottom', 
            horizontal: index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right' 
          }}
          sx={{
            // Stack snackbars
            position: 'fixed',
            [`${index % 2 === 0 ? 'top' : 'bottom'}`]: `${80 + (index * 70)}px`,
          }}
        >
          <Alert 
            onClose={() => handleSnackbarClose(snackbar.id)} 
            severity="info"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
