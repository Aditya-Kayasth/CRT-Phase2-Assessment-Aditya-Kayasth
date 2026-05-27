
function App() {
  const name = "Adika"
  const age = 22
  const isStudent = true
  const hasFees = true

  return (
    <>
      <h2>{name.toUpperCase()}</h2>
      <p>{age}</p>
      {isStudent ? <p>Currently Studying</p> : <p>Working Professional</p>}
      {hasFees && <button>Pay Fees</button>}
    </>
  )
}

export default App;