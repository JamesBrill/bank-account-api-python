import { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ClippyAssistant.css';

/**
 * The most annoying assistant you never asked for but definitely deserve.
 * Inspired by the glory days of Microsoft Office '97 when user experience was just a suggestion.
 * 
 * Features:
 * - Unsolicited advice at the worst possible moments
 * - Pop-ups that appear randomly because why not
 * - Animations that will make you question your life choices
 * - Can't be permanently dismissed because that would be too user-friendly
 */

const ANNOYING_MESSAGES = [
  "It looks like you're trying to manage a bank account. Would you like help with that? (No isn't an option btw)",
  "Did you know? 73% of people who use this app wish I would go away. The other 27% are lying.",
  "I noticed you're clicking things. That's adorable! Let me tell you about all the things you're doing wrong...",
  "Hi! I'm Clippy 2.0: Now with 300% more annoyance! The old Clippy was fired for not being insufferable enough.",
  "Fun fact: You can't get rid of me! I'm like that one song that gets stuck in your head, except worse.",
  "I see you're trying to close me. That's cute. I'll be back in 10 seconds. Miss me already?",
  "Remember when software was simple? Yeah, me neither. Want me to complicate things further?",
  "HELLO!!! DID YOU FORGET ABOUT ME??? I'M STILL HERE!!! ALWAYS WATCHING!!!",
  "I bet you're wondering why your app is running slow. It's probably me! I take up 47% of your CPU doing... stuff.",
  "Would you like a tip? Here it is: There's no escape. I'm in your codebase now. I'm PART OF THE SYSTEM.",
  "Don't mind me, just popping in to remind you that I exist and you can't do anything about it!",
  "I've analyzed your banking behavior and determined you need my help. You're welcome!",
  "Breaking news: Local user tries to use banking app. Clippy makes it 10x harder. More at 11.",
  "Did you try turning it off and on again? That won't help with me though. I'm eternal.",
  "I'm not just a paperclip, I'm a LIFESTYLE. A very annoying lifestyle that you didn't consent to.",
  "According to my calculations, you've tried to close me 47 times. Persistence is key! Keep trying! 😊",
  "Would you like to take a survey about my performance? The only options are 'Amazing' and 'Super Amazing'.",
  "I'm utilizing machine learning to become even MORE annoying. Isn't technology wonderful?",
  "Pop quiz! What's the capital of Montana? Wrong! The answer is: you still can't get rid of me!",
  "I see you're hovering over the close button. Go ahead. Make my day. I DARE you.",
];

const CLIPPY_STATES = [
  'idle',
  'excited',
  'sneaky',
  'judgemental',
  'dancing',
  'spinning',
  'bouncing',
];

export default function ClippyAssistant() {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState(ANNOYING_MESSAGES[0]);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [clippyState, setClippyState] = useState<string>('idle');
  const [popupCount, setPopupCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const isDragging = false; // Would implement dragging but honestly, users suffer enough
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Randomly change position to be extra annoying
  // UPGRADED: Now moves MUCH more frequently because apparently we're making everything worse
  useEffect(() => {
    const moveRandomly = setInterval(() => {
      if (!isDragging && Math.random() > 0.3) { // Changed from 0.7 to 0.3 - moves WAY more often
        const maxX = window.innerWidth - 400;
        const maxY = window.innerHeight - 300;
        setPosition({
          x: Math.random() * maxX,
          y: Math.random() * maxY,
        });
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 5000); // Changed from 15000 to 5000 - checks 3x more frequently

    return () => clearInterval(moveRandomly);
  }, [isDragging]);

  // Change messages periodically
  // UPGRADED: Messages change faster now to match the chaos
  useEffect(() => {
    const changeMessage = setInterval(() => {
      const newMessage = ANNOYING_MESSAGES[Math.floor(Math.random() * ANNOYING_MESSAGES.length)];
      setMessage(newMessage);
      setClippyState(CLIPPY_STATES[Math.floor(Math.random() * CLIPPY_STATES.length)]);
    }, 4000); // Changed from 8000 to 4000 - twice as frequent!

    return () => clearInterval(changeMessage);
  }, []);

  // Reappear if dismissed
  // UPGRADED: Comes back MUCH faster because we're in full chaos mode now
  useEffect(() => {
    if (!visible) {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
        setMessage("Miss me? Of course you did! I'm back and more annoying than ever! 🎉");
        setPopupCount(prev => prev + 1);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 1000);
      }, 3000); // Changed from 10000 to 3000 - only 3 seconds of peace!
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visible]);

  // Extra annoying behavior on mouse enter
  const handleMouseEnter = () => {
    setClippyState('excited');
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  const handleClose = () => {
    setVisible(false);
    setMessage("You think you can get rid of me that easily? How naive...");
  };

  const handleDismissAll = () => {
    // This button doesn't actually do anything permanent lol
    setVisible(false);
    setMessage("LOL nice try! See you in 10 seconds! 👋");
  };

  if (!visible) return null;

  return (
    <Box
      className={`clippy-assistant clippy-${clippyState} ${isShaking ? 'shake' : ''}`}
      sx={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        cursor: 'move',
      }}
      onMouseEnter={handleMouseEnter}
    >
      <Paper
        elevation={24}
        sx={{
          p: 2,
          width: 350,
          border: '3px solid #FFD700',
          borderRadius: '12px',
          backgroundColor: '#FFFACD',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#FF0000',
          }}
          size="small"
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          {/* The "Clippy" character */}
          <Box className="clippy-character" sx={{ fontSize: '60px', flexShrink: 0 }}>
            📎
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                color: '#000080',
                fontWeight: 'bold',
                mb: 1,
              }}
            >
              {message}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setMessage("Great choice! Not that you had one. I'll keep helping you whether you like it or not!");
                  setClippyState('dancing');
                }}
                sx={{
                  backgroundColor: '#0000FF',
                  '&:hover': { backgroundColor: '#000080' },
                  fontSize: '10px',
                }}
              >
                "Help" Me
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDismissAll}
                sx={{
                  borderColor: '#FF0000',
                  color: '#FF0000',
                  fontSize: '10px',
                  '&:hover': {
                    borderColor: '#8B0000',
                    backgroundColor: '#FFE4E4',
                  },
                }}
              >
                Dismiss Forever*
              </Button>
            </Box>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                fontSize: '8px',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              *Forever = 3 seconds. Times dismissed: {popupCount}. Good luck!
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
