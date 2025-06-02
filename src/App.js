
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';

export default function DragonboatTrainingApp() {
  const [data, setData] = useState([]);
  const [paddler, setPaddler] = useState('');
  const [speed, setSpeed] = useState('');
  const [exercise, setExercise] = useState('');
  const [date, setDate] = useState('');

  const handleAddEntry = () => {
    if (!paddler || !speed || !exercise || !date) return;
    const newEntry = { paddler, speed, exercise, date };
    setData([...data, newEntry]);
    setPaddler('');
    setSpeed('');
    setExercise('');
    setDate('');
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TrainingData');
    XLSX.writeFile(wb, 'Dragonboat_Training.xlsx');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dragonboat Training Monitor</h1>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <input 
          className="border p-2 rounded" 
          placeholder="Paddler Name" 
          value={paddler} 
          onChange={e => setPaddler(e.target.value)} 
        />
        <input 
          className="border p-2 rounded" 
          placeholder="Speed (km/h)" 
          value={speed} 
          onChange={e => setSpeed(e.target.value)} 
        />
        <input 
          className="border p-2 rounded" 
          placeholder="Exercise" 
          value={exercise} 
          onChange={e => setExercise(e.target.value)} 
        />
        <input 
          className="border p-2 rounded" 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddEntry}>Add Entry</button>
        <button className="bg-gray-500 text-white p-2 rounded" onClick={handleExportExcel}>Export to Excel</button>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Training Logs</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Paddler</th>
            <th className="border p-2">Speed</th>
            <th className="border p-2">Exercise</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="border p-2">{entry.paddler}</td>
              <td className="border p-2">{entry.speed}</td>
              <td className="border p-2">{entry.exercise}</td>
              <td className="border p-2">{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
