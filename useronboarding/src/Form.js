import React from 'react'
import  './form.css';


export default function Form(props){
    const {
        values,
        submit,
        change,
        // disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
    const {name, value, type, checked} = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }

    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div className="first-form-group">
                <h2>Add a User!</h2>
                <button>Submit</button>
            </div>
            <div className='second-form-group'>
                <h3>User Information</h3>
                <div className='label-one'>
                <label>Name:
                    <input 
                    value={values.name}
                    onChange={onChange}
                    name='name'
                    type='text'
                    />
                </label>
                </div>
                <div className='label-two'>
                <label>Email:
                    <input 
                    value={values.email}
                    onChange={onChange}
                    name='email'
                    type='text'
                    />
                </label>
                </div>
                <div className='label-three'>
                <label>Password:
                    <input 
                    value={values.password}
                    onChange={onChange}
                    name='password'
                    type='text'
                    />
                </label>
                </div>
            </div>
            <div className="checkbox">
                <h6>Do you agree to the terms of service?</h6>
                <label>Yes
                    <input 
                    type='checkbox'
                    name='Yes'
                    checked={values.yes}
                    onChange={onChange}
                    />
                </label>
                <div className='errors'>
                    <div>{errors.user}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                </div>
            </div>
        </form>
    )
}