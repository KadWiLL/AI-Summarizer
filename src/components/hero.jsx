import React from 'react'
import {logo} from '../assets'

const hero = () => {
  return (
    <header className="w-full flex justify-content items-center flex-col">
        <nav className="flex justify-between items-center flex-row w-full mb-10 pt-3">
          <h2 className='log'>KadWiLL</h2>
          <button className="black_btn" 
          type='button'
          onClick={() => {
            window.open('');
          }}
          >
            GitHub
          </button>
        </nav>

        <h1 className="head_text">
          Summerize Articles with <br className='max-md:hidden'/>
          <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className="desc">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries
        </h2>
    </header>
  )
}

export default hero