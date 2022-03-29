import { createPortal } from "react-dom";
import styles from './Loader.module.scss';

export default function Loader(props) {
    if (!props.show) return null;

    return createPortal(
        <div className={styles.container}>
            <span>Loading...</span>
        </div>,
        document.getElementById('app-loader')
    )
}