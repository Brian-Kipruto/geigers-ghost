import { useState, useEffect } from 'react';
import { useSceneStore } from '../store.js';

// Dialog Data
const STEPS = [
  {
    title: "INCOMING TRANSMISSION...",
    text: "Can you hear me? I am Dr. Geiger... or what's left of him. Welcome to my lab. Try not to die.",
    action: "NEXT"
  },
  {
    title: "NAVIGATION",
    text: "You're a ghost now, but you still have eyes. Click and Drag to rotate your view. Scroll to zoom.",
    action: "NEXT",
    showMouseAnim: true 
  },
  {
    title: "INVERSE-SQUARE LAW",
    text: "See that glowing Vat? That's pure death. Radiation intensity drops as you move away (1/d²). Drag the Counter CLOSE to the Vat to measure it.",
    action: "TASK_CRITICAL" // Code will wait for > 100 CPS
  },
  {
    title: "ATTENUATION (SHIELDING)",
    text: "Too hot! Grab that Lead Case. Place it DIRECTLY between the Vat and the Counter to block the particles.",
    action: "TASK_SAFE" // Code will wait for drop in radiation
  },
  {
    title: "FREE ROAM",
    text: "Excellent work. You understand the physics of the dead. The lab is yours to explore...",
    action: "CLOSE"
  }
];

export default function TutorialOverlay() {
  const tutorialStep = useSceneStore((state) => state.tutorialStep);
  const setTutorialStep = useSceneStore((state) => state.setTutorialStep);
  const clicksPerSecond = useSceneStore((state) => state.clicksPerSecond);
  
  const [typedText, setTypedText] = useState("");
  const currentStepData = STEPS[tutorialStep];

  // Typewriter Effect
  useEffect(() => {
    if (!currentStepData) return;
    let i = 0;
    setTypedText("");
    const interval = setInterval(() => {
      setTypedText(currentStepData.text.slice(0, i + 1));
      i++;
      if (i > currentStepData.text.length) clearInterval(interval);
    }, 30); // Speed of typing
    return () => clearInterval(interval);
  }, [tutorialStep]);

  // Auto-Advance Logic for Physics Tasks
  useEffect(() => {
    if (currentStepData?.action === "TASK_CRITICAL" && clicksPerSecond > 150) {
       // User found the radiation!
       setTimeout(() => setTutorialStep(3), 1000);
    }
    if (currentStepData?.action === "TASK_SAFE" && clicksPerSecond < 50 && clicksPerSecond > 0) {
       // User successfully shielded!
       setTimeout(() => setTutorialStep(4), 1000);
    }
  }, [clicksPerSecond, currentStepData]);

  if (tutorialStep >= STEPS.length - 1) return null; // Hide when done (except strictly for Free Roam text)

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      display: 'flex',
      alignItems: 'flex-end',
      pointerEvents: 'none', // Let clicks pass through to 3D scene
      zIndex: 2000,
      fontFamily: '"Courier New", monospace',
    }}>
      
      {/* 1. THE AVATAR (Hologram Style) */}
      <div style={{
        width: '150px',
        height: '150px',
        backgroundImage: 'url("/scientist.png")', // Make sure file is in public/
        backgroundSize: 'cover',
        borderRadius: '50%',
        border: '4px solid #00ff00',
        boxShadow: '0 0 20px #00ff00',
        marginRight: '20px',
        backgroundColor: '#000',
        opacity: 0.9,
      }} />

      {/* 2. THE DIALOG BOX */}
      <div style={{
        width: '400px',
        backgroundColor: 'rgba(0, 20, 0, 0.9)',
        border: '2px solid #00ff00',
        padding: '20px',
        borderRadius: '10px',
        color: '#00ff00',
        pointerEvents: 'auto', // Enable clicking the Next button
      }}>
        <h3 style={{ margin: '0 0 10px 0', textDecoration: 'underline' }}>
          {currentStepData.title}
        </h3>
        
        <p style={{ minHeight: '60px', fontSize: '14px', lineHeight: '1.4' }}>
          {typedText}
        </p>

        {/* 3. MOUSE ANIMATION (Only for Step 1) */}
        {currentStepData.showMouseAnim && (
          <div style={{ 
            marginTop: '10px', 
            fontSize: '12px', 
            border: '1px solid #00ff00', 
            padding: '5px', 
            display: 'inline-block' 
          }}>
            [MOUSE: LEFT CLICK + DRAG]
          </div>
        )}

        {/* 4. NEXT BUTTON (Only if not a physics task) */}
        {(currentStepData.action === "NEXT" || currentStepData.action === "CLOSE") && (
          <button 
            onClick={() => setTutorialStep(tutorialStep + 1)}
            style={{
              marginTop: '10px',
              backgroundColor: '#00ff00',
              color: '#000',
              border: 'none',
              padding: '5px 15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              float: 'right'
            }}
          >
            {currentStepData.action === "CLOSE" ? "ENTER LAB" : "CONTINUE >>"}
          </button>
        )}
      </div>
    </div>
  );
}