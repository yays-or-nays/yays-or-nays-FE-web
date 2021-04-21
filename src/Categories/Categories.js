import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './Categories.css';
import axios from 'axios';
import {query} from 'gql-query-builder';

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
      .post(
        'https://yays-or-nays-be.herokuapp.com/graphql',
        query({
          operation: 'tags',
          fields: ['id', 'category'],
        }),
      )
      .then(response => {
        try {
          console.log(response);
          setCategories(response.data.data.tags);
        } 
        catch {
          return response;
        }
      });
  }, [])

  const categoryButtons = categories.map(category => {
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
  });

  return (
    <main>
      {categoryButtons}
    </main>
  )
}
