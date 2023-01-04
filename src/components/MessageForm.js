import React, { useState } from 'react'
import { sendMessage } from '../api'

const MessageForm = (props) => {
  const [message, setMessage] = useState('')
  const postId = props.post._id

  return (
    <div>
      <form>
        <input
          placeholder='Message to Poster'
          value={message}
          onChange={ev => setMessage(ev.target.value)}
        />
        <button onClick={ev => sendMessage(postId, message)} disabled={!message} >Send Message</button>
      </form>
    </div>
  )
}

export default MessageForm
