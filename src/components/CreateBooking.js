import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"

const CreateBooking = () => {
  const [booking, setBooking] = useState({});
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistants, setSelectedAssistants] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const URL = apiUtils.getUrl()

  const handleInput = (event) => {
    setBooking({ ...booking, [event.target.id]: event.target.value })
  }

  useEffect(() => {
    const getAssistants = async () => {
      const response = await apiUtils.getAuthAxios().get(URL + '/assistant/all')
      setAssistants(response.data.assistants);
    }
    getAssistants()
  }, [URL]);

  const addAssistant = (assistantId, checked) => {
    if (checked) {
      selectedAssistants.push({ id: assistantId })
      setSelectedAssistants(selectedAssistants)
    }

    if (!checked) {
      setSelectedAssistants(selectedAssistants.filter(a => a.id !== assistantId))
    }
  }

  const createBooking = async () => {
    try {
      await apiUtils.getAuthAxios().post(URL + "/booking", {
        duration: booking.duration,
        car: {
          regNumber: booking.regNumber,
          model: booking.model,
          make: booking.make,
          year: booking.year
        },
        assistants: selectedAssistants,
        user: localStorage.getItem('user')
      })
      setMsgColor('#4caf50');
      setStatusMessage('Booking created successfully!');
    } catch (error) {
      setStatusMessage(error.response.data.message);
      setMsgColor('#FF0000')
    }
  }

  return (
    <div className="centerContent ">
      <h1>Book a car wash</h1>
      <p className="statusMsg" style={{ color: msgColor }}>{statusMessage}</p>
      <form onChange={handleInput}>
        <input className="form-control addInput" id="duration" placeholder="Enter desired duration" type="text"></input>
        <input className="form-control addInput" id="regNumber" placeholder="Enter car registration number" type="text"></input>
        <input className="form-control addInput" id="model" placeholder="Enter car model" type="text"></input>
        <input className="form-control addInput" id="make" placeholder="Enter car make" type="text"></input>
        <input className="form-control addInput" id="year" placeholder="Enter car year" type="text"></input>
      </form>
      <h4>Choose assistants</h4>
      <ul>
        {assistants.map((a) =>
          <li key={a.id}>
            {a.name} <input onChange={(event) => addAssistant(event.target.value, event.target.checked)} type="checkbox" id="assistantId" name={a.name} value={a.id}></input>
          </li>)}
      </ul>
      <button onClick={createBooking} className="btn btn-primary mt-3">Create</button>
    </div>
  )
}

export default CreateBooking