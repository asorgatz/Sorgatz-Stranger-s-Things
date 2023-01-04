const COHORT = '2209-FTB-ET-WEB-AM'

// I have two exchangeTokenForUser functions, this is used by login, and the other is used in the 
// export const exchangeTokenForUser = (token)=> {
//     let newUser 
//     // const token = window.localStorage.getItem('token');
//     try {
//         fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
//         headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${ token }` 
//         },
//       })
//       .then(response => response.json())
//       .then(result => {
//         newUser = result.data;
//       })
//       return newUser
//     } catch (error) {
//         console.error(error)
//     }
//   };

export const exchangeTokenForUser = async (token) => {
    try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result = await response.json();
        const user = result.data
        console.log(['ext result', user])
        return user
    } catch (error) {
        console.error(error)
    }
}

export const pushPost = async (title, description, price, willDeliver) => {
    // const navigate = useNavigate()
    try {
        const token = window.localStorage.getItem('token')
        const response = await fetch(`https://strangers-things.herokuapp.com/api/${COHORT}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    willDeliver
                }
            })
        })
        const result = await response.json()
        console.log(result)
        return result.data.post
    } catch (error) {
        console.error(error)
    }
    // navigate("/home")
}

export const deletePost = (id) => {
    try {
        const token = window.localStorage.getItem('token')
        fetch(`https://strangers-things.herokuapp.com/api/${COHORT}/posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(result => {
                console.log(result);

            })
    } catch (error) {
        console.error(error)
    }
}

export const fetchPosts = async (token) => {
    try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ token }`
            },
        });
        const result = await response.json();
        const posts = result.data.posts
        return posts 
    } catch (error) {
        console.error(error)
    }

}

export const sendMessage = (id, message) => {
    try {
        const token = window.localStorage.getItem('token')
        fetch(`https://strangers-things.herokuapp.com/api/${COHORT}/posts/${id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: message
                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
            })
    } catch (error) {
        console.error(error)
    }
}