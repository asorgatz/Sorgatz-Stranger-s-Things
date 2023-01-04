import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, HashRouter, Routes, Route, Link,} from 'react-router-dom';
import { exchangeTokenForUser, fetchPosts } from './api/'
import { Posts, Post, Login, Register, CreatePost, Messages} from './components/index'


const App = ()=> {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null)
 

  useEffect(()=> {
    console.log('effect')
    const token = window.localStorage.getItem('token')
    const getUser = async ()=>{
      const newUser = await exchangeTokenForUser(token);
      console.log(['newUser',newUser])
      setUser(newUser)
      console.log(['user after setUser', user])
    };
    //TODO: Move fetch posts to api doc, right now its bugged when not logged in, has to do with token state i think

    // const getPosts = async ()=>{
    //   const allPosts = await fetchPosts(token)
    //   setPosts(allPosts)
    // };

    if (token){
      console.log('if token')
      getUser()

      // getPosts()

    };
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }` 
      },
    })
    .then( response => response.json())
    .then( json => setPosts(json.data.posts))
    console.log(['user at end of useEffect',user])
  }, [token])

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setUser({});
    setToken(null);
  }

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
          <Login user={user} setUser={ setUser } setToken={setToken}/>
        </div>) : null
        } 

      <nav>
        <Link to='/'> Home </Link>
        {user._id ? <Link to='/createpost'> Create Post</Link> : null}
        {user._id ? <Link to='/messages'> Messages</Link> : null}
      </nav>

      <Routes>
        <Route path='/' element= { <Posts posts={posts}/> }/> 
        <Route path='/posts/:id' element = {<Post posts={ posts } user={ user }/>} />
        <Route path='/createpost' element= {<CreatePost posts={posts} setPosts={setPosts}/>}/>
        <Route path='/messages' element= {<Messages user={user}/>}/>
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
