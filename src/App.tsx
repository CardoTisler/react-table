import React from 'react';
import './App.css';
import Table from './components/Table';
// Typescript
// React
// material-ui@latest
// react-final-form@latest
// react-table@7.*.*
// TODO: Consider Row-level state management for "cancel" functionality to revert back to default values.
function App() {
  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
