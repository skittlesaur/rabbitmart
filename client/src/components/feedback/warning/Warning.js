import Feedback from "../Feedback";

const Warning = ({warning, setWarning}) => {
    const style = {
        backgroundColor: '#ffcc6e',
        color: 'black'
    }

    return <Feedback style={style} message={warning} setMessage={setWarning}/>
}

export default Warning;