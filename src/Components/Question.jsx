import {FaUserCircle} from 'react-icons/fa'

export default function Question(props){
    return(
        <div className="question-wrapper">
            <div className='question'>
                <FaUserCircle className='icon'/><div className='question__user'>{props.question}</div>
            </div>
        </div>
    )
}