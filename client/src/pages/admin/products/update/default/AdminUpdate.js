import styles from './adminUpdate.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Error from "../../../../../components/feedback/error/Error";
import Loading from "../../../../../components/loading/Loading";
import {useDispatch} from "react-redux";
import {adminUpdateDatabase} from "../../../../../actions/products";
import Warning from "../../../../../components/feedback/warning/Warning";

const AdminUpdate = () => {

    const [file, setFile] = useState(null);
    const [data, setData] = useState("");
    const [mode, setMode] = useState("");
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setData("");
        const reader = new FileReader()
        if (file != null) {
            reader.onload = () => {
                const lines = reader.result;
                setData(lines);
            };
            reader.readAsText(file);
        }
    }, [file])

    const handleSubmit = () => {

        // check if the file was uploaded
        if (!data || !file)
            return setError("Please upload a CSV file");

        // check if there's a modification mode selected
        if (!mode)
            return setError("Please select a mode");

        // check that all fields are included in the header
        const fields = ['product_id', 'name', 'price', 'image', 'weight', 'measurement', 'category', 'stock'];
        const headers = data.split("\n")[0].split(",");
        for (const field of fields) {
            let found = false;
            for (const header of headers) {
                const headerCleaned = header.toLowerCase().replace(/(\r)+/, "");
                if (headerCleaned === field.toLowerCase()) {
                    found = true;
                    break;
                }
            }

            if (!found)
                return setError(`Field ${field} was not found in the CSV header`);
        }

        const onSuccess = (updatedData) => {
            setLoading(false);
            if (!updatedData.length)
                return setWarning('No changes; database matches the csv file');
            navigate('/admin/products/update/success');
        }

        const onError = (e) => {
            setError(e.message);
            setLoading(false);
        }

        setLoading(true);
        dispatch(adminUpdateDatabase(data, mode, onSuccess, onError));
    }

    return (
        <div className={styles['wrapper']}>
            {loading && <Loading text={'Updating Database'} overlay={true}/>}
            {error && <Error error={error} setError={setError}/>}
            {warning && <Warning warning={warning} setWarning={setWarning}/>}
            <div className={styles['header']}>
                <div className={'heading'}>
                    <h1>Update Products</h1>
                </div>
                <p><span className={styles['note']}>Warning:</span> Once the database is updated it cannot be restored.
                </p>
            </div>
            <div className={styles['action']}>
                <input onChange={(e) => setFile(e.target.files[0])} type={'file'} accept={'text/csv'}/>
                <div className={styles['mode']}>
                    <div className={styles['mode-title']}>Mode</div>
                    <div onClick={() => setMode("UPDATE")}
                         className={`${styles[`mode-btn`]} ${mode === "UPDATE" && styles['active']}`}>Update products by
                        id
                    </div>
                    <div onClick={() => setMode("REGENERATE")}
                         className={`${styles[`mode-btn`]} ${mode === "REGENERATE" && styles['active']}`}>Delete all
                        entries and
                        upload csv
                    </div>
                </div>
                <div onClick={handleSubmit} className={`btn1 ${styles['update']}`}>Update</div>
                <Link className={styles['format']} to={'/admin/products/update/help'}>CSV Format Guidelines</Link>
            </div>
        </div>
    );
}

export default AdminUpdate;