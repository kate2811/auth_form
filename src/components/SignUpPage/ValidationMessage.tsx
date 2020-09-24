import React from 'react'
import style from './SignUpPage.module.css'

function ValidationMessage({ children }: { children: string }) {
  return <div className={style.input__feedback}>{children}</div>
}

export default ValidationMessage
