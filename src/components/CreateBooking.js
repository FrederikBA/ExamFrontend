import { useState } from "react"
import apiUtils from "../utils/apiUtils"

const CreateBooking = () => {
  const init = { duration: 0, car: { regNumber: "", model: "", make: "", year: 0 }, assistants: [{ id: 0 }], user: "" }
  const [booking, setBooking] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const URL = apiUtils.getUrl()

  const handleInput = (event) => {
    setBooking({ ...booking, [event.target.id]: event.target.value })
    console.log(booking);
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
        assistants: [
          {
            id: booking.id
          }
        ],
        user: localStorage.getItem('user')
      })
      setMsgColor('#4caf50');
      setStatusMessage('Movie Added Successfully!');
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
        <input className="form-control addInput" id="id" placeholder="Enter ID of desired assistant" type="text"></input>
      </form>
      <button onClick={createBooking} className="btn btn-primary mt-3">Create</button>
    </div>
  )
}

export default CreateBooking