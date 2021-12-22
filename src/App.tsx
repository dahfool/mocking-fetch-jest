import React, { useEffect, useState } from 'react'

interface mission {
  name: string
  flight: number
}

interface rocket {
  capsule_serial: string
  capsule_id: string
  status: string
  original_launch: string
  original_launch_unix: number
  missions: mission[]
  landings: number
  type: string
  details: string
  reuse_count: number
}

function App() {
  const [rockets, setRockets] = useState<rocket[]>([])
  const [details, setDetails] = useState<rocket | null>(null)
  const [error, setError] = useState(false)
  const fetchRockets = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v3/capsules')
      const rockets: rocket[] = await response.json()
      setRockets(rockets)
    } catch (e) {
      setError(true)
      console.error(e)
    }
  }

  const detailView = (id: string) => {
    const data = rockets.find((x) => x.capsule_serial === id)
    if (data) setDetails(data)
  }

  useEffect(() => {
    fetchRockets()
  }, [])

  return (
    <div className='App'>
      {details ? (
        <>
          <p>{details.details}</p>
          <button onClick={() => setDetails(null)}>back</button>
        </>
      ) : (
        <>
          {rockets.map(({ capsule_serial, capsule_id }) => {
            return (
              <div key={capsule_serial}>
                <div>{capsule_serial}</div>
                <button onClick={() => detailView(capsule_serial)}>
                  find out more
                </button>
              </div>
            )
          })}
        </>
      )}
      {error && <p>an error has occurred</p>}
    </div>
  )
}

export default App
