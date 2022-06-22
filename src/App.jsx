import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

import { useForm } from 'react-hook-form'

const URL = 'https://users-crud1.herokuapp.com/users/'
 
function App() {

  const {handleSubmit, register, reset} = useForm()

  const [users, setUsers] = useState()
  const [isShowForm, setIsShowForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState()

  const getAllUsers = () => {
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const createUser = newUser => {
    console.log(newUser)
    axios.post(URL, newUser)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUserById = (id, updateUser) => {

    axios.patch(`${URL}${id}/`, updateUser)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        setObjectUpdate()
        setIsShowForm(false)
      })
      .catch(err => console.log(err))
  }

  const showForm = () => {
    const obj = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: ""
    }
    reset(obj)
    setIsShowForm(!isShowForm)  
  }
  console.log(users)

  return (
    <div className="App">
      <div>
        <button onClick={showForm}>{isShowForm ? 'Hide Form' :'Create a new User'}</button>
      </div>
      <div>
        {
          isShowForm && 
          <UsersForm           
            createUser={createUser}
            updateUserById={updateUserById}
            objectUpdate={objectUpdate}
            reset={reset}
            register={register}
            handleSubmit={handleSubmit}       
          />
        }
      </div>
      {
        users?.map(user => (
          <UsersList
            key={user.id}
            user={user}
            URL={URL}
            getAllUsers={getAllUsers}
            setObjectUpdate={setObjectUpdate}
            setIsShowForm={setIsShowForm}
            reset={reset}
          />
        ))
      }
    </div>
  )
}

export default App
