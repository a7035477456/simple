import { useEffect, useState } from 'react';

export default function App() {
  const [msg, setMsg] = useState('...');

  useEffect(() => {
    fetch('/api/getMessage')
      .then(r => r.json())
      .then(({ message }) => setMsg(message))
      .catch(() => setMsg('(backend error)'));
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 24 }}>
      <h1>Hello {msg}</h1>
      <p>This should read <strong>Hello Andrew Ton</strong> after nginx login.</p>
    </div>
  );
}

