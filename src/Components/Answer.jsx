import {FiCodesandbox} from 'react-icons/fi'
import { Typewriter, useTypewriter } from 'react-simple-typewriter'
import {useEffect} from 'react'


export default function Answer(props){
    
    
    const [text] = useTypewriter({
        words: [props.answer],
        typeSpeed: 25,
        loop: 1
    })
   
    

    return(
        <div className="answer-wrapper">
            <div className='answer'>
                <FiCodesandbox className='icon'/>{props.answer ? <div className ="answer-chat">{text}</div> : ""}
            </div> 
        </div>
    )
}


