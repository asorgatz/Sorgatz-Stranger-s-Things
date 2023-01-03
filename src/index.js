import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, HashRouter, Routes, Route, Link,} from 'react-router-dom';
// import Posts from './components/Posts'
// import Post from './components/Post'
// import Login from './components/Login'
// import Register from './components/Register'
// import CreatePost from './components/CreatePost';
// import { exchangeTokenForUser } from './api/'
import { Posts, Post, Login, Register, CreatePost} from './components/index'


const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null)
  
  //move to api file, had troubles moving it there becasue setUser, should I import state or pass it as prop and why
  
  const exchangeTokenForUser = ()=> {
    const token = window.localStorage.getItem('token');
    setToken(token)
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

  useEffect(()=> {
    exchangeTokenForUser();
    //make api function to fetch posts
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }` 
      },
    })
    .then( response => response.json())
    .then( json => setPosts(json.data.posts))
  }, [token])

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
        <Link to='/home'> Home </Link>
        
        {
        user._id ? <Link to='/createpost'> Create Post</Link> : null
      }
      </nav>

      <Routes>
        
        <Route path='/home' element= { <Posts posts={posts}/> }/> 
        <Route path='/posts/:id' element = {
          <Post posts={ posts }/>
        } 
        />
        <Route path='/createpost' element= {<CreatePost/>}/>
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
