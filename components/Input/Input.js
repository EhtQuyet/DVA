import React from "react";
import Styles from './input.module.css'

function Input({inputType, title, placeholder, handleClick}) {
  return (
      <div className={Styles.input}>
        <p>{title}</p>

        {inputType === 'text' ? (
            <div className={Styles.input__box}>
              <input type='text' className={Styles.input__box__form} placeholder={placeholder} onChange={handleClick}/>
            </div>
        ) : ("")}
      </div>
  )
}

export default Input