import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { deletePost } from '../api'
import MessageForm from './MessageForm';

const Post = (props)=> {
    const posts = props.posts;
    const id = useParams().id;
    const post = posts.find(post => post._id === id);
    const user = props.user;

    console.log(post)
    console.log(user)

    if(!post){
      return null;
    }
    return (
      <div>
        <h1><Link to='/'>{ post.title }</Link></h1> 
        <p>{post.price}</p>
        <p>
          { post.description }
        </p>
         { post.willDeliver ? <p> Will Deliver</p> : <p>Will Not Deliver</p>}
         { post.isAuthor ? <div> 
          {/* when edit added */}
          {/* <button> Edit </button>  */}
          <button onClick={ ev => {deletePost(post._id); window.location.href = '/dist/#/home'}}> Delete </button> </div>: null}
         { !post.isAuthor && user._id ? <MessageForm post={post}/>: null}
      </div>
    );
  }
  
  export default Post;