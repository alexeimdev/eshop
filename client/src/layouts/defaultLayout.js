import React from 'react';
import styles from './defaultLayout.module.scss';

export function DefaultLayout(props) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>{props.headerTitle}</h1>
            </header>
            <main className={styles.main}>{props.children}</main>
        </div>
    )
}