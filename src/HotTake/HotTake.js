import React, {useState, useEffect} from 'react';
import './HotTake.css';

export default function HotTake({hotTake}) {


  return (
    hotTake ? 
    <main className='hot-take'>
      <p>{hotTake.question}</p>
      <img className="hot-take-img" src={hotTake.picture} alt='hot take' />
      <section>
        <button>Yay</button>
        <button>Nay</button>
      </section>
    </main>
    :
    <main className='no-hot-take'>
      <p>Select a Category!</p>
    </main>
  )
}
