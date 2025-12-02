import { useSceneStore } from '../store.js';

export default function RadiationMonitor() {
  const clicksPerSecond = useSceneStore((state) => state.clicksPerSecond);
  
  // Conversion logic (Arbitrary ratio for game feel)
  const uSv = (clicksPerSecond * 0.15).toFixed(2);
  const cps = Math.floor(clicksPerSecond);

  // Determine Safety Level
  let status = "NORMAL";
  let color = "#00ff00"; // Green

  if (cps > 10) {
    status = "WARNING";
    color = "#ffff00"; // Yellow
  }
  if (cps > 100) {
    status = "CRITICAL";
    color = "#ff0000"; // Red
  }

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontFamily: '"Courier New", Courier, monospace',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '15px',
      border: '2px solid #555',
      borderRadius: '8px',
      color: '#ffaa00',
      width: '220px',
      pointerEvents: 'none', // Let clicks pass through
      zIndex: 1000,
    }}>
      <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #555', fontSize: '16px' }}>
        RADIATION MONITOR
      </h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span>ACTIVITY:</span>
        <span>{cps} CPS</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span>DOSE RATE:</span>
        <span>{uSv} µSv/h</span>
      </div>

      <div style={{ marginTop: '10px', fontWeight: 'bold', color: color }}>
        STATUS: {status}
      </div>
    </div>
  );
}