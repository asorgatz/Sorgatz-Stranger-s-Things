import React, {useState} from 'react';
import { Link } from 'react-router-dom';



const Posts = (props) => {
    const posts = props.posts
    const [searchTerm, setSearchTerm] = useState('')
    const [fullSearch, setFullSearch] = useState('')

    const postMatches = (post, text) => {
        if (post.title.includes(text)) {
            return true
        }
    }

    const filteredPosts = posts.filter(post => postMatches(post, fullSearch));
    const postsToDisplay = fullSearch.length ? filteredPosts : posts;

    return (
        <div>
            <h1>Posts</h1>
            <form>
                <input
                    placeholder='Search'
                    value={searchTerm}
                    onChange={ev => setSearchTerm(ev.target.value)}
                >
                </input>
                <button 
                onClick={ ev =>  setFullSearch(searchTerm) }
                > Search</button>
            
            </form>
            <div>
                {
                    postsToDisplay.map(post => {
                        return (
                            <div key={post._id}>
                                <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                                <p> {post.description}</p>
                                <p>Price: {post.price}</p>
                                <p>Location: {post.location}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Posts