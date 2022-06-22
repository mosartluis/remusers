import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const UsersForm = ({createUser, updateUserById, objectUpdate, reset, handleSubmit, register}) => {
 
  const defaultValuesForm = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthday: ""
  }

  const submit = data => {
    if(objectUpdate !== undefined){
      updateUserById(objectUpdate.id, data)
      reset(defaultValuesForm)
    } else {
      createUser(data)
    }
    reset(defaultValuesForm)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="first_name">First Name </label>
          <input type="text" id='first_name' {...register('first_name')} />
        </div>
        <div>
          <label htmlFor="last_name">Last Name </label>
          <input type="text" id='last_name' {...register('last_name')} />
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input type="text" id='email' {...register('email')} />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input type="password" id='password' {...register('password')} />
        </div>
        <div>
          <label htmlFor="birthday">Birthday </label>
          <input type="date" id='birthday' {...register('birthday')} />
        </div>
        <button>Submit</button>
      </form>
  )
}

export default UsersForm