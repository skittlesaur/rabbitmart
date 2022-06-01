import styles from './feedback.module.css';
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const Feedback = ({style, message, setMessage}) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // hide error message after 5 seconds
        setTimeout(() => {
            setVisible(false);

            // reset error message (deletes component)
            setTimeout(() => {
                setMessage('')
            }, 500);
        }, 5000);
    }, [setMessage])

    return (
        <AnimatePresence>
            {visible &&
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className={styles['wrapper']}
                    style={style}>
                    {message}
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default Feedback;