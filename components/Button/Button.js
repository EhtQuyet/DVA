import React from "react";
import Styles from './button.module.css'

function Button({btnName,  handleClick, classStyles}) {
  return (
     <button className={Styles.button} type="button" onClick={handleClick}>
       {btnName}
     </button>
  )
}

export default Button