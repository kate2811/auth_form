import React from 'react'
import style from './SignUpPage.module.css'
import { useForm } from 'react-hook-form'
import { checkEmailValidity, signUp } from '../../api/api'
import { isEmail } from 'validator'
import cx from 'classnames'
import { SingUpData } from '../../types'

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, errors, formState, reset } = useForm<SingUpData>({ mode: 'onChange' })
  const { touched, isValid, isSubmitted } = formState

  const onSubmit = (data: SingUpData) => signUp(data)
  const onReset = () => reset()

  return (
    <div className={style.container}>
      <h1 className={style.header__title}>Sign Up</h1>
      <p className={style.header__description}>Enter your details to create your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form__group}>
          <input
            name="firstName"
            placeholder="First Name"
            className={cx(style.input, errors.firstName ? style.input_invalid : touched.firstName && style.input_valid)}
            ref={register({
              required: true
            })}
          />
          {errors.firstName && <div className={style.input__feedback}>Your name is required</div>}
        </div>

        <div className={style.form__group}>
          <input
            name="lastName"
            placeholder="Last name"
            className={cx(style.input, errors.lastName ? style.input_invalid : touched.lastName && style.input_valid)}
            ref={register({
              required: true
            })}
          />
          {errors.lastName && <div className={style.input__feedback}>Your last name is required</div>}
        </div>

        <div className={style.form__group}>
          <input
            name="email"
            placeholder="Email"
            className={cx(style.input, errors.email ? style.input_invalid : touched.email && style.input_valid)}
            type="email"
            ref={register({
              required: true,
              validate: {
                isEmail: (value) => isEmail(value),
                isUnique: (value) => checkEmailValidity(value)
              }
            })}
          />
          {errors.email?.type === 'required' && <div className={style.input__feedback}>Email is required</div>}
          {errors.email?.type === 'isEmail' && <div className={style.input__feedback}>Enter a valid email</div>}
          {errors.email?.type === 'isUnique' && <div className={style.input__feedback}>The email already exists</div>}
        </div>

        <div className={style.form__group}>
          <input
            name="password"
            placeholder="password"
            type="password"
            className={cx(style.input, errors.password ? style.input_invalid : touched.password && style.input_valid)}
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password?.type === 'required' && <div className={style.input__feedback}>Password is required</div>}
          {errors.password?.type === 'minLength' && (
            <div className={style.input__feedback}>Password must be at least 6 characters</div>
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
