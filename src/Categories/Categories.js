import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './Categories.css';
import axios from 'axios';
import {query} from 'gql-query-builder';

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query{\n  tags{\n      id\n      category\n  }\n}\n",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("https://yays-or-nays-be.herokuapp.com/graphql", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }, [])

  const categoryButtons = categories ? categories.map(category => {
    return (
      <section
        className='category-button'
        id={category.id}
        key={category.id}
        to="/hottakes">
        <p>
          {categories.length ? category.category : 'Loading'}
        </p>
      </section>
    );
  }) : <p>Loading...</p>;

  return (
    <main>
      {categoryButtons}
    </main>
  )
}




