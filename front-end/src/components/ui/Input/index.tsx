import styles from "./styles.module.scss"

import { IInputProps, ITextAreaProps } from "../../../interfaces"

export function Input ({ ...rest }: IInputProps) {
    return (
        <input className={styles.input} {...rest}/> 
    )
}

export function TextArea({ ...rest }: ITextAreaProps) {
    return (
        <textarea className={styles.input} {...rest}></textarea>
    )
}