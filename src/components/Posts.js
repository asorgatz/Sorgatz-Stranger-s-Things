import React from 'react';
import { Link } from 'react-router-dom';



const Posts = (props) => {
    const posts = props.posts

    return (
        <div>
          <h1>Posts</h1>
          <ul>
            {
              posts.map( post => {
                return (
                    <div key={ post._id }>
                        <h3><Link to={`/posts/${post._id}`}>{ post.title }</Link></h3>
                        <p> {post.description}</p>
                        <p>Price: {post.price}</p>
                        <p>Location: {post.location}</p>
                  </div>
                );
              })
            }
          </ul>
        </div>
      );
}

export default Posts