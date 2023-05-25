import { useState, useEffect, useRef } from 'react'
import './App.css';
const SECONDS = 300
let nbr=200


let array_list = [
  "asdf;lkj ", "asdfljk;", "asdlfjk;", "jkl;asdf",
  'asdf', 'asjk', 'sdff', 'jfds', 'alks', 'dsaa', 'lkjl', 'lkjk',
  'llls', 'akfd', 'sdjl', 'kass', 'ajaj', 'sad', 'jkls',
  'jdjd', 'lsls', 'fdfdf', 'asd;', 'fksl;', ';asd', 'df;sa', 'ljk;', 'f;d;', 'sd;f',
  'sd;l;', 'fds;a', 'kjk;', 'fjll;', 'l;l;d', 'dfdsa', 'l;lk', 'fds;', 'jks;', 'kjdd',
  'jkfa;', 'jdjd;s', 'kdkdk;', 'dsa;;', 'fasd;', 'fdsa;',
  'kjh;', 'dafs;', ';dfkl', 'sda;', 'dsa;', 'asd;;', 'kjkj;l', 'jasd;',
]

const App = () => {
  const [input, setInput] = useState('')
  const [countDown, setCountDown] = useState(SECONDS)
  const [status, setStatus] = useState('waiting')
  const [word, setword] = useState(array_list)
  const [wordIndex, setWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(-1)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [key, setKey] = useState('')
  const [currChar, setCurrChar] = useState("")
  const [ten,setTen]=useState(0)
  const textInput = useRef(null)


  useEffect(() => {
    setword(getRandomVlues(array_list, nbr))
  }, [])

  function getRandomVlues(array_list, nbr) {
    const shuffled = [...array_list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, nbr);
  }

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus()
    }
  }, [status])

  const strtBtn = () => {
    if (status === 'finished') {
      setword(getRandomVlues(array_list, nbr))
      setWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
    }

    if (status !== 'started') {
      setStatus('started')
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval)
            setStatus('finished')
            setInput("")
            return SECONDS
          } else {
            return prevCountdown - 1
          }
        })
      }, 1000)
    }

  }
  const handleKeyDown = ({ keyCode, key }) => {
    setKey(keyCode)
    if (keyCode === 32) {
      compareWord()
      setInput('')
      setWordIndex(wordIndex + 1)
      setCurrCharIndex(-1)
    }
    else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1)
      setCurrChar("")
    } else {
      setCurrCharIndex(currCharIndex + 1)
      setCurrChar(key)
    }
  }
  const compareWord = () => {
    const wordToCompare = word[wordIndex]
    const doesItMatch = wordToCompare === input.trim()
    console.log({ input, doesItMatch })
    if (doesItMatch) {
      setCorrect(correct + 1)
    } else {
      setIncorrect(incorrect + 1)
    }
  }
  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === wordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'green'
      } else {
        return 'green'
      }
    } else if (wordIdx === wordIndex && currCharIndex >= word[wordIndex].length) {
      return 'red'
    } else {
      return ''
    }
  }
  console.log(ten, 'l')
  return (
    <div className="App">
      <div className='header'>
        <img src='https://www.typingtest.com/forms/img/lady.svg' height='150px'  alt='right'/>
        <div>
          <h1>Typing Test</h1>
          <h1 className='count'>{countDown}</h1>
        </div>
        <img src="https://www.typingtest.com/theme/img/gentleman.svg" height='150px' alt='left' />
      </div>
      <form >
     
        <label htmlFor='2'>Repeat 2</label>
        <input type='radio' id='2' name='2' onChange={((e) => setTen(e.target.value))} value='2' />
        <label htmlFor='3'>Repeat 3</label>
        <input type='radio' id='3' name='2'  onChange={((e) => setTen(e.target.value))} value='3' />
        <label htmlFor='4'>Repeat 4</label>
        <input type='radio' id='4'  name='2' onChange={((e) => setTen(e.target.value))} value='4' />
        <label htmlFor='5'>Repeat 5</label>
        <input type='radio' id='5' name='2' onChange={((e) => setTen(e.target.value))} value='5' />
      </form>

      <div className='container'>
        <input type='text' placeholder='Text Here' className='input-text' ref={textInput}
          disabled={status !== "started"} value={input} onChange={((e) => setInput(e.target.value))} onKeyDown={handleKeyDown} />
        <button type='button' className='input-btn' onClick={strtBtn}>Start</button>
      </div>
      {status === 'started' &&
        <div className='practise-text'>
          {word.map((wor, i) => (
            <span key={i}>
              <span>
                {wor.split(" ").map((char, idx) => (
                  <span className={getCharClass(i, idx, char)} key={idx}>{char} &nbsp;</span>
                ))}
              </span>
              <span>  </span>

            </span>
          ))}
        </div>
      }

      {status === 'finished' &&
        <div className='result'>
          <div>
            <h2 className='count-word'>Words per minute:</h2>
            <p>{correct}</p>
          </div>
          <div>
            <h2 className='count-word'>Accuracy:</h2>
            {correct !== 0 ? (
              <p className="has-text-info is-size-1">
                {Math.round((correct / (correct + incorrect)) * 100)}%
              </p>
            ) : (
              <p className="has-text-info is-size-1">0%</p>
            )}
          </div>
        </div>
      }
      <div className='keyboard'>
        <div>
          <button className='one' >Tab</button>
          <button className='two'>Q</button>
          <button className='two'>W</button>
          <button className='two'>E</button>
          <button className='two'>R</button>
          <button className='two'>T</button>
          <button className='two'>Y</button>
          <button className='two'>U</button>
          <button className='two'>I</button>
          <button className='two'>O</button>
          <button className='two'>P</button>
          <button className='one'>Back Space</button>
        </div>
        <div>
          <button className='one'>Caps Lock</button>
          <button className={key === 65 ? 'two green' : 'two mid-key'} value="a" onClick=''>A</button>
          <button className={key === 83 ? 'two green' : 'two mid-key'}>S</button>
          <button className={key === 68 ? 'two green' : 'two mid-key'}>D</button>
          <button className={key === 70 ? 'two green' : 'two mid-key'}>F</button>
          <button className='two blue'>G</button>
          <button className='two blue'>H</button>
          <button className={key === 74 ? 'two green' : 'two mid-key'}>J</button>
          <button className={key === 75 ? 'two green' : 'two mid-key'}>K</button>
          <button className={key === 76 ? 'two green' : 'two mid-key'}>L</button>
          <button className={key === 186 ? 'two green' : 'two mid-key'}>;</button>
          <button className='one'>Enter</button>
        </div>
        <div>
          <button className='one'>Ctrl</button>
          <button className='two'>Z</button>
          <button className='two'>X</button>
          <button className='two'>C</button>
          <button className='two'>V</button>
          <button className='two'>B</button>
          <button className='two'>N</button>
          <button className='two'>M</button>
          <button className='two'>k</button>
          <button className='two'>/</button>
          <button className='two'>?</button>
          <button className='two'>shift</button>
        </div>


      </div>
    </div>
  );
}

export default App;
