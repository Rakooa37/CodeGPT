import "./Styles/App.css"
import {useState, useEffect, useRef} from 'react'
import { Configuration, OpenAIApi } from "openai";
import TextareaAutosize from 'react-textarea-autosize';
import {FiSend, FiCodesandbox} from 'react-icons/fi'
import {BsSun} from 'react-icons/bs'
import {TiFlashOutline} from 'react-icons/ti'
import {AiOutlineWarning, AiOutlineArrowLeft} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import Question from "./Components/Question";
import Answer from "./Components/Answer";
import { Typewriter } from 'react-simple-typewriter'
import Modal from "./Components/Modal"
import ReactSwitch from 'react-switch';
import { Loading } from 'react-loading-dot'

export default function App(){

    
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [isAnswer, setIsAnswer] = useState([])

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [counter, setCounter] = useState(0)
    const [isSideBar, setIsSideBar] = useState(true)
    const [isModal, setIsModal] = useState(false)

    const sidebar = useRef(null)
    const hamburger = useRef(null)
    const arrow = useRef(null)
    const app = useRef(null)
    const [checked, setChecked] = useState(true);
    const [model, setModel] = useState("code-davinci-002")
    const [loading, setLoading] = useState(false)

    

    useEffect(()=>{
        console.log(question);
    }, [question])

    useEffect(()=>{
        console.log(model)
    })

    useEffect(()=>{
        if(answer!==""){
        setIsAnswer([...isAnswer, true])
        setAnswers([...answers, answer])}
        setLoading(false)
    }, [answer])

    useEffect(()=>{
        if(checked){
            setModel("code-davinci-002")
        }else{
            setModel("text-davinci-003")
        }
    },[checked])

    
    const configuration = new Configuration({
    apiKey: "apiKey",
    });

    const openai = new OpenAIApi(configuration);

    function giveAnswer(prompt){
    openai.createCompletion({
        model: model,
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 500,
    }).then(res=>{
        console.log(res.data.choices[0].text);
        setAnswer(res.data.choices[0].text)
    })
    }



    const onClick = ()=>{
        setLoading(true)
        giveAnswer(question)
        setQuestions([...questions, question])
        setQuestion("")
        setCounter(counter+1)
        
    }

    const onKeyDown = (e)=>{
        if(e.key === "Enter" && e.target.value !=="" &&  e.target.value !=="\n" && e.target.value !=="\n\n" && e.target.value !=="\n\n\n"){
            setLoading(true)
            giveAnswer(question)
            setQuestions([...questions, question])
            setQuestion("")
            setCounter(counter+1)
            
        }
    }

    const onChange = (e)=>{
        setQuestion(e.target.value)
    }

    const onClickHamburger = (e)=>{
        hamburger.current.style= "display:none"
        sidebar.current.style = "display: flex; position: absolute; z-index: 2;"
        arrow.current.style = "display: block; position: absolute"
    }

    const onClickArrow = (e)=>{
        hamburger.current.style = "display:block"
        sidebar.current.style = "display: none;"
        arrow.current.style = "display: none"
    }

    const onClickAbout = (e)=>[
        setIsModal(!isModal)
    ]

    const setSwitch = ()=>{
        setChecked(!checked)
    }



   
    return(
        
        <div className="app-wrapper" ref={app}>
            {isModal ? <Modal onClickAbout={onClickAbout}></Modal> : ""}
            
            <div className="sidebar" ref={sidebar}>
                <div className="sidebar__title"><FiCodesandbox/><div className="title">CodeGPT</div></div>
                <div className="links">
                    <div className="link" onClick={onClickAbout} style ={{cursor:"pointer"}}>About</div>

                    <div className="switch">
                        <div>Chat</div>
                    <ReactSwitch
                        className="react-switch"
                        checkedIcon={""}
                        uncheckedIcon={""}
                        onColor={"#888"}
                        checked={checked}
                        onChange={setSwitch}
                        height={20}
                        width={50}
                        handleDiameter={20}
                    />
                    <div>Code</div>
                    </div>  
                </div>
            </div>
            <div className="chat-section">
            <button className="hamburger" onClick={onClickHamburger} ref={hamburger} ><GiHamburgerMenu ></GiHamburgerMenu></button>
            <button className="arrow" onClick={onClickArrow} ref={arrow} ><AiOutlineArrowLeft ></AiOutlineArrowLeft></button>
            {loading ? <Loading background="rgb(192,192,192)" size="1rem" margin="0.75rem"></Loading> : ""}
                {questions.length === 0 ? <div className="prompt">
                    <div className="prompt__title">CodeGPT</div>
                    <div className="prompt__content">
                        <div className="prompt__content--examples content">
                            <BsSun className="icon"></BsSun>
                            <div className="title">Examples</div>
                            <div className="card">"How do I make an HTTP request in JavaScript?"</div>
                            <div className="card">"What is UseEffect hook in React?"</div>
                            <div className="card">"What is wrong with this piece of code?..."</div>
                        </div>
                        <div className="prompt__content--capabilities content">
                            <TiFlashOutline className="icon"></TiFlashOutline>
                            <div className="title">Capabilities</div>
                            <div className="card">"Remembers what user asked previously"</div>
                            <div className="card">"Allow user to do follow-up corrections"</div>
                            <div className="card">"Trained to decline inappropriate requests"</div>
                        </div>
                        <div className="prompt__content--limitations content">
                            <AiOutlineWarning className="icon"></AiOutlineWarning>
                            <div className="title">Limitations</div>
                            <div className="card">"May generate incorrect information"</div>
                            <div className="card">"May generate biased or harmul instruction"</div>
                            <div className="card">"Limited knowledge of the world after 2021"</div>
                        </div>
                    </div>
                </div> : ""}
                
                {questions.map((el,i)=>{return <><Question question={questions[i]} key={i}/>{isAnswer[i] ? <Answer answer={answers[i]} key = {i}/> : null}</>
                })}
                

                <div className="wrapper-input">
                    <TextareaAutosize value = {question} onChange= {onChange} className="input" maxRows="2" minRows="1" onKeyDown={onKeyDown}/>
                    <button className = "submit" onClick={onClick}><FiSend className="send-icon"></FiSend></button>
                </div>
                
                
            </div>
        </div>
    )
}
