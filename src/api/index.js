const url = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM'
const COHORT = '2209-FTB-ET-WEB-AM'

export const exchangeTokenForUser = ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      fetch(`${ url }/users/me`, {
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

    }
