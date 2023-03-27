import React from 'react'


export default function Modal(props) {
  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <div className='title'>
          CodeGPT
        </div>
              <div className='content'>
              This is a ChatGpt clone that uses "Codex code-davinci-002" which is a model from open AI that is more suited for answering coding questions.
              Alternatively you can switch to the "GPT text-davinci-003", which is the model used by the regular ChatGpt.
              </div>

              <button onClick={props.onClickAbout}>Close</button>
        </div>
            
        
    </div>
  )
}
