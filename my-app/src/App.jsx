import { useEffect, useState } from 'react';

export default function App() {
  const [msg, setMsg]   = useState('...');
  const [host, setHost] = useState('');
  const [ip, setIp]     = useState('');

  useEffect(() => {
    fetch('/api/getMessage')
      .then(r => r.json())
      .then(({ message, hostname, serverIp }) => {
        setMsg(message);
        setHost(hostname || '');
        setIp(serverIp || '');
      })
      .catch(() => setMsg('(backend error)'));
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 24 }}>
      <h1>Hello {msg}</h1>
      <p>Served by <strong>{host || 'unknown-host'}</strong>{ip ? <> (<code>{ip}</code>)</> : null}</p>
      <p>This should read <strong>Hello Andrew Ton</strong> after nginx login.</p>
    </div>
  );
}

