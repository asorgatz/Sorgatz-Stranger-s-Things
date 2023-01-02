import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Post = (props)=> {
    const posts = props.posts;
    const id = useParams().id;
    const post = posts.find(post => post._id === id);
    if(!post){
      return null;
    }
    return (
      <div>
        <h1><Link to='/posts'>{ post.title }</Link></h1> 
        <p>{post.price}</p>
        <p>
          { post.description }
        </p>
         { post.willDeliver ? <p> Will Deliver</p> : <p>Will Not Deliver</p>}
        


      </div>
    );
  }
  
  export default Post;