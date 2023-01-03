import { useNavigate} from 'react-router-dom';
const url = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM'
const COHORT = '2209-FTB-ET-WEB-AM'

// I have two exchangeTokenForUser functions, this is used by login, and the other is used in the 
export const exchangeTokenForUser = ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }` 
        },
      })
      .then(response => response.json())
      .then(result => {
        const user = result.data;
        setUser(user);
      })
    }
  };


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
        
    } catch (error) {
        console.error(error)
    }
    // navigate("/home")
    }

export const deletePost = (id)=>{
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