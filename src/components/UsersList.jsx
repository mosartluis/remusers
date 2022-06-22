import axios from 'axios'
import React from 'react'

const UsersList = ({user, getAllUsers, URL, setObjectUpdate, setIsShowForm, reset}) => {

  const deleteUser = id => {
    axios.delete(`${URL}${id}/`)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUser = () => {
    setIsShowForm(true)

    const obj = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      birthday: user.birthday
    }
    reset(obj)
    setObjectUpdate(user)
  }

  return (
    <article className='card'>
      <h2>{`#${user.id}`}</h2>
      <ul>        
        <li><b>First Name: </b>{user.first_name}</li>
        <li><b>Last Name: </b>{user.last_name}</li>
        <li><b>Email: </b>{user.email}</li>
        <li><b>Birthday: </b>{user.birthday}</li>
      </ul>
      <button onClick={() => deleteUser(user.id)}>Trash</button>
      <button onClick={updateUser}>Update</button>
    </article>
  )
}

export default UsersList