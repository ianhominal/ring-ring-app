import { useState } from 'react';

const Timbre = () => {
  const [pressed, setPressed] = useState(false);
  const [name, setName] = useState('');

  const handleButtonClick = () => {
    if (!pressed && name.trim()) {
        fetch('http://localhost:3000/ifttt-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: name }),
            })
            .then(response => {
            if (response.ok) {
                setPressed(true);
            }
            })
            .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div> 
      <input
        type="text"
        placeholder="Quien es?"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={pressed}
      />
      <button onClick={handleButtonClick} disabled={pressed || !name.trim()}>
        {pressed ? 'Timbre Presionado' : 'Tocar Timbre'}
      </button>
    </div>
  );
};

export default Timbre;
