import React, { useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'
import schema from './formSchema'
import './App.css';
import Form from './Form'
import User from './User'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  Yes: false,
}

const initialFormErrors ={
  name: '',
  email: '',
  password: '',
  Yes: false,
}

const initialUsers =[]
const initialDisabled = true

export default function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues,setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then (res => {
        setUsers(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([...users, res.data])
        console.log([...users, res.data])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }
  const validate = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(valid => { //eslint-disable-line
      setFormErrors({
        ...formErrors,
        [name]: ""
      })
    })
    .catch (err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]      
      });
    });
  }
  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }
  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      Yes: ['yes'].filter(hob => formValues[hob]),
    }
    postNewUser(newUser)
  }
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>Users Form</h1></header>
        <Form 
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
        /> 
      {
        users.map(user => {
          return(
            <User key={user.id} details={user}/>
          )
        })
      }
    </div>
  )
}


