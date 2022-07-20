import "./App.css";
import { useState } from "react";

function App() {
  const [stages, setStages] = useState([])

  const [birthDate, setBirthDate] = useState(Date.now())
  const [preferredDeathAge, setPreferredDeathAge] = useState(65)
  const [diet, setDiet] = useState(0)
  const [exercise, setExercise] = useState(0)
  const [cigarretes, setCigarretes] = useState(0)
  const [stress, setStress] = useState(0)
  const [accident, setAccident] = useState(0)

  const [actualDeathAge, setActualDeathAge] = useState(0)

  function SwitchOnRating(rating) {
    if (rating <= 3) return -5
    else if (rating <= 6) return -3
    else if (rating <= 9) return -1
    else return +3
  }

  function getAge() {
    return (new Date(Date.now()).getFullYear() - birthDate.getFullYear())
  }

  function Calculate() {
    const age = getAge()
    let actualDeathAge = 95

    actualDeathAge += SwitchOnRating(diet)
    actualDeathAge += SwitchOnRating(exercise)
    actualDeathAge += -SwitchOnRating(cigarretes)
    actualDeathAge += -SwitchOnRating(stress)
    actualDeathAge += -SwitchOnRating(accident)

    setActualDeathAge(actualDeathAge)

    let newStages = []

    newStages.push({ height: "20px", color: "red" })
    newStages.push({ height: `${age * 8}px`, color: "green" })
    newStages.push({ height: "20px", color: "orange" })

    if (preferredDeathAge <= actualDeathAge) {
      newStages.push({ height: `${(preferredDeathAge - age) * 8}px`, color: "green" })
      newStages.push({ height: "20px", color: "yellow" })
      newStages.push({ height: `${(actualDeathAge - preferredDeathAge) * 8}px`, color: "green" })
      newStages.push({ height: "20px", color: "grey" })
    } else {
      newStages.push({ height: `${(actualDeathAge - age) * 8}px`, color: "green" })
      newStages.push({ height: "20px", color: "grey" })
      newStages.push({ height: `${(preferredDeathAge - actualDeathAge) * 8}px`, color: "green" })
      newStages.push({ height: "20px", color: "yellow" })
    }

    setStages(newStages)
  }

  return (
    <div>
      <label>Date of Birth:</label>
      <input onChange={e => setBirthDate(e.target.valueAsDate)} defaultValue="1/1/0001" type="date" />

      <br />

      <label>Preferred Age of Death:</label>
      <input
        onChange={e => setPreferredDeathAge(e.target.valueAsNumber)}
        defaultValue="65"
        type="number"
        minLength="2"
        min="65"
      />

      <hr />

      <label>Rate the following on a scale of 1-10</label>

      <hr />

      <label>Your diet:</label>
      <input
        onChange={e => setDiet(e.target.valueAsNumber)}
        defaultValue="0"
        type="number"
        minLength="1"
        min="0"
        max="10"
      />

      <br />

      <label>How often you exercise:</label>
      <input
        onChange={e => setExercise(e.target.valueAsNumber)}
        defaultValue="0"
        type="number"
        minLength="1"
        min="0"
        max="10"
      />

      <br />

      <label>
        Your amount of exposure to cigarretes or other secondhand-smoke:
      </label>
      <input
        onChange={e => setCigarretes(e.target.valueAsNumber)}
        defaultValue="0"
        type="number"
        minLength="1"
        min="0"
        max="10"
      />

      <br />

      <label>How often you have "clumsy moments":</label>
      <input onChange={e => setAccident(e.target.valueAsNumber)} defaultValue="0" type="number" minLength="1" min="0" max="10" />

      <br />

      <label>How often you deal with stress:</label>
      <input
        onChange={e => setStress(e.target.valueAsNumber)}
        defaultValue="0"
        type="number"
        minLength="1"
        min="0"
        max="10"
      />

      <hr />

      <button onClick={Calculate}>Calculate</button>

      <hr />

      {stages.length > 0 ? (
        <div>
          <h3>Key</h3>
          <br />
          <div className="key">
            <div style={{ height: '20px', width: '20px', backgroundColor: 'green' }}></div>
            <br />
            <span>General Life</span>
          </div>
          <br />
          <div className="key">
            <div style={{height: "20px", width: "20px", backgroundColor: "red"}}></div>
            <br />
            <span>Birth</span>
          </div>
          <br />
          <div className="key">
            <div style={{height: "20px", width: "20px", backgroundColor: "orange"}}></div>
            <br />
            <span>Current Age ({getAge()})</span>
          </div>
          <br />
          <div className="key">
            <div style={{height: "20px", width: "20px", backgroundColor: "yellow"}}></div>
            <br />
            <span>Desired Age of Death ({preferredDeathAge})</span>
          </div>
          <br />
          <div className="key">
            <div style={{height: "20px", width: "20px", backgroundColor: "grey"}}></div>
            <br />
            <span>Actual Age of Death ({actualDeathAge})</span>
          </div>
          <br />

          <hr />

          <div className="graph">
          {
            stages.map(function (stage) { 
              return ( 
                <>
                  <div className="key">
                    <div style={{width: stage.height, height: "20px", backgroundColor: stage.color, border: "solid black 1px"}}></div>
                    <br/>
                  </div>
                </> 
              )
            })
          }
          </div>
          
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
