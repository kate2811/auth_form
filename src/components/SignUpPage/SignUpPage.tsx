import React, { useCallback } from 'react'
import style from './SignUpPage.module.css'
import { useForm } from 'react-hook-form'
import { checkEmailValidity, signUp } from 'api/api'
import { isEmail } from 'validator'
import cx from 'classnames'
import { SingUpData } from 'types'
import ValidationMessage from './ValidationMessage'

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm<SingUpData>({ mode: 'onChange' })
  const { isValid, isSubmitted, dirtyFields } = formState
  const onReset = useCallback(() => reset(), [])

  const getInputClassNames = useCallback(
    (fieldName: string) => {
      return cx(
        style.input,
        dirtyFields[fieldName] && !errors[fieldName] && style.input_valid,
        errors[fieldName] && style.input_invalid
      )
    },
    [errors, dirtyFields]
  )

  return (
    <div className={style.container}>
      <h1 className={style.header__title}>Sign Up</h1>
      <p className={style.header__description}>Enter your details to create your account</p>

      <form onSubmit={handleSubmit(signUp)}>
        <div className={style.form__group}>
          <input
            name="firstName"
            placeholder="First Name"
            className={getInputClassNames('firstName')}
            ref={register({
              required: true
            })}
          />
          {errors.firstName && <ValidationMessage children="Your name is required" />}
        </div>

        <div className={style.form__group}>
          <input
            name="lastName"
            placeholder="Last name"
            className={getInputClassNames('lastName')}
            ref={register({
              required: true
            })}
          />
          {errors.lastName && <ValidationMessage children="Your last name is required" />}
        </div>

        <div className={style.form__group}>
          <input
            name="email"
            placeholder="Email"
            className={getInputClassNames('email')}
            type="email"
            ref={register({
              required: true,
              validate: {
                isEmail: (value) => isEmail(value),
                isUnique: (value) => checkEmailValidity(value)
              }
            })}
          />
          {errors.email?.type === 'required' && <ValidationMessage children="Email is required" />}
          {errors.email?.type === 'isEmail' && <ValidationMessage children="Enter a valid email" />}
          {errors.email?.type === 'isUnique' && <ValidationMessage children="The email already exists" />}
        </div>

        <div className={style.form__group}>
          <input
            name="password"
            placeholder="password"
            type="password"
            className={getInputClassNames('password')}
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password?.type === 'required' && <ValidationMessage children="Password is required" />}
          {errors.password?.type === 'minLength' && (
            <ValidationMessage children="Password must be at least 6 characters" />
          )}
        </div>

        <button type="submit" className={style.button} disabled={!isValid}>
          Sign up
        </button>

        {isSubmitted && (
          <p className={style.form__alert}>
            Your account has been created!
            <button onClick={onReset} className={style.button_inline}>
              Try again?
            </button>
          </p>
        )}
      </form>
    </div>
  )
}

export default SignUpPage
