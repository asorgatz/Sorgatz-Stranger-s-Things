import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, HashRouter, Routes, Route, Link} from 'react-router-dom';
import Posts from './components/Posts'
import Post from './components/Post'

let url = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts'

const App = ()=> {
  const [posts, setPosts] = useState([]);

  
  useEffect(()=> {
    fetch(url)
    .then( response => response.json())
    .then( json => setPosts(json.data.posts))
  }, [])

  console.log(posts)
  return (
    <div>
      <h1>Stranger's Things</h1>
      <nav>
        <Link to='/'> Home </Link>
        <Link to='/posts'>Posts ({posts.length})</Link>
      </nav>
      <Routes>
        
        <Route path='/posts' element= { <Posts posts={posts}/> }/> 
        <Route path='/posts/:id' element = {
          <Post posts={ posts }/>
        } />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
