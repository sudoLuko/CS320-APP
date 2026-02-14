import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './components/Board'
import Column from './components/Column'
import Card from './components/Card'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>
      <Board/>
      <Column />
      <Card />
    </div>
  </React.StrictMode>
)
