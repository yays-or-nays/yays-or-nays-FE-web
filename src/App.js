import './App.css';
import React, {useState} from 'react';
import Categories from './Categories/Categories';
import HotTake from './HotTake/HotTake';

function App() {
  const [hotTake, setHotTake] = useState({});

  const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: "query{\n  hotTakeByCategory(tagId: 10) {\n    id\n    question\n    yesVote\n    noVote\n    picture\n    tag{\n      id\n      category\n    }\n  }\n}\n\n",
    variables: {}
  })
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow'
  };

  const getHotTake = id => {
    fetch("https://yays-or-nays-be.herokuapp.com/graphql", requestOptions)
      .then(response => response.json())
      .then(result => setHotTake(result.data.hotTakeByCategory))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <Categories getHotTake={getHotTake} />
      <HotTake hotTake={hotTake} />
    </div>
  );
}

export default App;




