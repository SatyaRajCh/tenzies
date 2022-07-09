import React, {useState, useEffect} from "react"
import './App.css'
import Header from "./components/Header"
import Die from './components/Die'
import RollDice from './components/RollDice'
import {nanoid} from 'nanoid';
import Confetti from "react-confetti";

function App() {
  const [tenzies, setTenzies] = useState(false)
  const [dice, setDice] = useState(allNewDice())

  function allNewDice(){
    const diceEle = []
    for (let i = 0; i < 10 ; i++) {
      diceEle.push({
        value:Math.round(Math.random()*10)%6,
        isHeld: false,
        id: nanoid()
      })
    }
    return diceEle
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} handleClick={() => holdDice(die.id)}/>
  ))

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
    }
    const newDice = allNewDice()
    setDice(oldDice => oldDice.map((die, index) => {
      return die.isHeld ? 
          die :
          {...die, value: newDice[index].value}
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  React.useEffect(function(){
    let valueSet = dice.map(die => die.value);
    let isHeldSet = dice.map(die => die.isHeld);

    if ( new Set(valueSet).size == 1 && new Set(isHeldSet).size == 1) {
      setTenzies(true)
      setDice(allNewDice())
    }
    
  }, [dice])

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <Header />
      <main className="content-frame">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container die-frame">
          {diceElements}
        </div>
        <RollDice handleClick={rollDice} btnText={tenzies ? "New Game" : "Roll"}/>
      </main>
    </div>
  );
}

export default App;
