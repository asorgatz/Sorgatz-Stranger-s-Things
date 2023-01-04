import React, {useState} from 'react'
import { pushPost } from '../api/';

const CreatePost = (props) =>{

    const [postTitle, setPostTitle] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postDeliver, setPostDeliver] = useState(false)

    const posts = props.posts
    const setPosts = props.setPosts

    const submitPost = async ()=>{
        console.log("creating post")
        try {
            const postData = await pushPost(postTitle, postPrice, postDescription, postDeliver);
            setPosts([...posts, postData])
            window.location.href = '/dist/#/home'
        } catch (error) {
            console.error(error)
        }
        

    }

  return (
    <div>
      <h1>Create Post</h1>
      <form>
        <input
        placeholder='title'
        value= {postTitle}
        onChange= {ev => setPostTitle(ev.target.value)}
        />
        <input
        placeholder='price'
        value= {postPrice}
        onChange= {ev => setPostPrice(ev.target.value)}
        />
        <input
        placeholder='description'
        value= {postDescription}
        onChange= {ev => setPostDescription(ev.target.value)}
        />
        <input 
        type="checkbox" 
        id="willDeliver" 
        name="willDeliver"
        value={postDeliver}
        onChange= {ev =>setPostDeliver(ev.target.checked)}
        />
        <label>Will Deliver?</label>
      </form>
      <button onClick={ submitPost } disabled={!postTitle || !postPrice || !postDescription}>Create Post</button>
    </div>
  )
}

export default CreatePost
