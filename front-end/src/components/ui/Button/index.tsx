import { IButtonProps } from "../../../interfaces"
import styles from "./styles.module.scss"

import { FaSpinner } from "react-icons/fa"

export function Button({ loading, children, ...rest }: IButtonProps) {
    return(
        <button className={styles.button} disabled={loading} {...rest}>
            { loading ? (<FaSpinner color="#FFF" size={16} />) : <a className={styles.buttonText}>{children}</a> }
        </button>
    )
}