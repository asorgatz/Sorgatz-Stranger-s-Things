import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, HashRouter, Routes, Route, Link} from 'react-router-dom';
import Posts from './components/Posts'
import Post from './components/Post'
import Login from './components/Login'
import Register from './components/Register'

let url = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts'

const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  
  useEffect(()=> {
    fetch(url)
    .then( response => response.json())
    .then( json => setPosts(json.data.posts))
    exchangeTokenForUser();
  }, [])

  const exchangeTokenForUser = ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }` 
        },
      })
      .then(response => response.json())
      .then(result => {
        const user = result.data;
        setUser(user);
      })
    }
  };


  const logout = ()=> {
    window.localStorage.removeItem('token');
    setUser({});
  }

  console.log(posts)
  return (
    <div>
      <h1>Sorgatz Stranger's Things</h1>
      {
        user._id ? <div>Welcome { user.username } <button onClick={ logout }>Logout</button></div> : null
      }
      {
        !user._id ? (
      <div>
        <Register/>
        <Login exchangeTokenForUser={ exchangeTokenForUser } />
      </div>) : null
      } 

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
