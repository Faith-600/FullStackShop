import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Data({ todos, setTodos }) {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  
  return (
    <div className="max-w-2xl mx-auto" style={{ marginTop: '200px' }}>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Your message
      </label>
      <textarea
        id="message"
        rows="4"
        cols='50'
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Your message..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      ></textarea>
      <button
        // onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Add
      </button>
     
      {error && <h1 className="text-red-500 mt-4">{error}</h1>}
     </div>
  );
}

export default Data;
