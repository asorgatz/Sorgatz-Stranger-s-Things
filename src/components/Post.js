import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { deletePost } from '../api'

const Post = (props)=> {
    const posts = props.posts;
    const id = useParams().id;
    const post = posts.find(post => post._id === id);
    // const user = getMe()
    console.log(post)

    if(!post){
      return null;
    }
    return (
      <div>
        <h1><Link to='/home'>{ post.title }</Link></h1> 
        <p>{post.price}</p>
        <p>
          { post.description }
        </p>
         { post.willDeliver ? <p> Will Deliver</p> : <p>Will Not Deliver</p>}
         { post.isAuthor ? <div> <button> Edit </button> <button onClick={ ev => {deletePost(post._id); window.location.href = '/dist/#/home'}}> Delete </button> </div>: null}
      </div>
    );
  }
  
  export default Post;