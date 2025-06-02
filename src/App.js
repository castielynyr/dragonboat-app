import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function DragonboatTrainingApp() {
  const [paddlers, setPaddlers] = useState([]);
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [exercise, setExercise] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('dragonboatData');
    if (savedData) {
      setPaddlers(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dragonboatData', JSON.stringify(paddlers));
  }, [paddlers]);

  const handleAddEntry = () => {
    if (!name || !speed || !exercise || !date) return alert('Please fill all fields');
    const newEntry = { name, speed: parseFloat(speed), exercise, date };
    setPaddlers([...paddlers, newEntry]);
    setName('');
    setSpeed('');
    setExercise('');
    setDate('');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(paddlers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Training Data');
    XLSX.writeFile(wb, 'dragonboat_training.xlsx');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Dragonboat Training Monitor</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Paddler Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 10, padding: 8, width: '40%' }}
        />
        <input
          placeholder="Speed (km/h)"
          type="number"
          value={speed}
          onChange={e => setSpeed(e.target.value)}
          style={{ marginRight: 10, padding: 8, width: '20%' }}
        />
        <input
          placeholder="Exercise"
          value={exercise}
          onChange={e => setExercise(e.target.value)}
          style={{ marginRight: 10, padding: 8, width: '30%' }}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ marginRight: 10, padding: 8, width: '30%' }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={handleAddEntry}
          style={{
            backgroundColor: '#2563EB',
            color: 'white',
            padding: '10px 15px',
            borderRadius: 5,
            border: 'none',
            cursor: 'pointer',
            marginRight: 10,
          }}
        >
          Add Entry
        </button>
        <button
          onClick={exportToExcel}
          style={{
            backgroundColor: '#10B981',
            color: 'white',
            padding: '10px 15px',
            borderRadius: 5,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Export to Excel
        </button>
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ddd',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Speed (km/h)</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Exercise</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {paddlers.map((p, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{p.name}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{p.speed}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{p.exercise}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DragonboatTrainingApp;
