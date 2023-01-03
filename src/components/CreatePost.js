import React, {useState} from 'react'
import { pushPost } from '../api/';

const CreatePost = () =>{

    const [postTitle, setPostTitle] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postDeliver, setPostDeliver] = useState(false)

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
      <button onClick={ev=>{pushPost(postTitle, postPrice, postDescription, postDeliver);window.location.href = '/dist/#/home'}}>Create Post</button>
    </div>
  )
}

// onSubmit={async(ev) => { 
//     try {
//         ev.preventDefault();
//         const token = await fetchLogin(username, password);
//         setToken(token);
//         const redirectposts = () => {
//             window.location.href = '/dist/index.html#/pos';
//         }
//         redirectposts();
//     } catch (error) {
//         console.error(error);
//     }
// }}

export default CreatePost
