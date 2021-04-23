import React, {useState, useEffect} from 'react';
import './Result.css';

const Result = ({hotTake, toggleResult, getHotTake}) => {

  const onClick = () => {
    getHotTake(hotTake.tag.id);
    toggleResult();
  }

  return(
    <section className='results'>
      <h3 className='results-title'>And the people say...</h3>
      <p className='votes'>Yes Votes: {hotTake.yesVote}</p>
      <p className='votes'>No Votes: {hotTake.noVote}</p>
      <button className='next-hottake' onClick={onClick}>Next HotTake</button>
    </section>
  )
}

export default Result;
