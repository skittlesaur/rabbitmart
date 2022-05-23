import Feedback from "../Feedback";

const Error = ({error, setError}) => {
    const style = {
        backgroundColor: '#FF1053',
        color: 'white'
    }

    return <Feedback style={style} message={error} setMessage={setError}/>
}

export default Error;