import React, {useState} from 'react'

const Messages = (props) => {
    const user = props.user
    const messages = user.messages
    console.log(user)

  return (
    <div className='messageBox'>
        <div>
            <h2>Recieved Messages</h2>
                <div>
                 { messages.map( message => {
                    if (message.fromUser.username !== user.username)
                    return (
                        <div key={message._id}>
                            <h3>{message.post.title}</h3>
                            <p>{message.content}</p>
                        </div>
                   )
                })
                }
            </div>
         </div>
         <div >
            <h2> Sent Messages</h2>
                <div>
                { messages.map( message => {
                    if (message.fromUser.username === user.username)
                    return (
                        <div key={message._id}>
                            <h3>{message.post.title}</h3>
                            <p>{message.content}</p>
                        </div>
                   )
                })
                }
                </div>
         </div>
    </div>
  )
}

export default Messages