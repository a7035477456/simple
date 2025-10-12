import { useEffect, useState } from 'react';

export default function App() {
  const [msg, setMsg]     = useState('...');
  const [host, setHost]   = useState('');
  const [ip, setIp]       = useState('');
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch('/api/getMessage')
      .then(r => r.json())
      .then(({ message, hostname, serverIp, count }) => {
        setMsg(message);
        setHost(hostname || '');
        setIp(serverIp || '');
        setCount(count);
      })
      .catch(() => setMsg('(backend error)'));
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 24 }}>
      <h1>Hello {msg}</h1>
      <p>Served by <strong>{host || 'unknown-host'}</strong>{ip ? <> (<code>{ip}</code>)</> : null}</p>
      <p>count = <strong>{count ?? '...'}</strong></p>
    </div>
  );
}

