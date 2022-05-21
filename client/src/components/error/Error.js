import styles from './error.module.css';
import {useEffect, useState} from "react";
import {motion, AnimatePresence} from 'framer-motion'

const Error = ({error, setError}) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // hide error message after 5 seconds
        setTimeout(() => {
            setVisible(false);

            // reset error message (deletes component)
            setTimeout(() => {
                setError('')
            }, 500);
        }, 5000);
    }, [])

    return (
        <AnimatePresence>
            {visible &&
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className={styles['wrapper']}>
                    {error}
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default Error;