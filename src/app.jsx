import React from 'react'
import Demo from './components/demo';
import Hero from './components/hero';
import './app.css'

const app = () => {
  return (
    <main>
        <div className='main'>
            <div className='gradient'/>
        </div>

        <div className="app">
            <Hero />
            <Demo />
        </div>
    </main>
  )
}

export default app