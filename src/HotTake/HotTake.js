import React, {useState, useEffect} from 'react';
import './HotTake.css';
import Result from '../Results/Result';
import axios from 'axios';
import {mutation} from 'gql-query-builder';

export default function HotTake({hotTake, getHotTake}) {
  const [resultDisplay, setResultDisplay] = useState(false);


  const onClick = (str) => {
    toggleResult();
    if(str === 'Yay') {
      return axios
    .post(
      'https://yays-or-nays-be.herokuapp.com/graphql',
      mutation({
        operation: `incrementYesVote(input: {id: ${hotTake.id}})`,
        fields: ['clientMutationId'],
      }),
    )
    .then(response => {
      console.log(response.data);
      if (response.status < 400) {
      } else {
        console.log('fail');
      }
    });
  }
  else if(str === 'Nay') {
    return axios
    .post(
      'https://yays-or-nays-be.herokuapp.com/graphql',
      mutation({
        operation: `incrementNoVote(input: {id: ${hotTake.id}}) {
          clientMutationId
        }`,
      }),
    )
    .then(response => {
      console.log(response.data);
      if (response.status < 400) {
        return response.data;
      } else {
        return response.status;
      }
    });
  }
  }

  const toggleResult = () => {
    setResultDisplay(!resultDisplay);
  }

  const display = () => {
    if (!resultDisplay && hotTake) {
      return (
        <main className='hot-take'>
          <p>{hotTake.question}</p>
          <img className="hot-take-img" src={hotTake.picture} alt='hot take' />
          <section>
            <button onClick={() => {
              hotTake.yesVote++
              onClick('Yay');
            }}>Yay</button>
            <button onClick={() => {
              hotTake.noVote++
              onClick('Nay');
            }}>Nay</button>
          </section>
        </main>
      )}
      else if (resultDisplay) {
        return (
          < Result hotTake={hotTake} toggleResult={toggleResult} getHotTake={getHotTake}/>
        )
      } else {
        return(
        <main className='no-hot-take'>
          <p>Select a Category!</p>
        </main>
      )}
  }

  return (
    display()
  )
}
