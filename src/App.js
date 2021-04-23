import './App.css';
import React, {useState} from 'react';
import Categories from './Categories/Categories';
import HotTake from './HotTake/HotTake';

function App() {
  const [hotTake, setHotTake] = useState(null);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const getHotTake = id => {
    fetch("https://yays-or-nays-be.herokuapp.com/graphql", {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        query: `query{\n  hotTakeByCategory(tagId: ${id}) {\n    id\n    question\n    yesVote\n    noVote\n    picture\n    tag{\n      id\n      category\n    }\n  }\n}\n\n`,
        variables: {}
      }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => setHotTake(result.data.hotTakeByCategory))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <Categories getHotTake={getHotTake} />
      <HotTake hotTake={hotTake} getHotTake={getHotTake}/>
    </div>
  );
}

export default App;
