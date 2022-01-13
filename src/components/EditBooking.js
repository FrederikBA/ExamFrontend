import apiUtils from "../utils/apiUtils"
import { useState } from "react"
import { useParams } from "react-router-dom"

const EditBooking = () => {
  const [booking, setBooking] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const URL = apiUtils.getUrl()
  const id = parseInt(useParams().id)

  const handleInput = (event) => {
    setBooking({ ...booking, [event.target.id]: event.target.value })
  }

  const editBooking = async () => {
    try {
      await apiUtils.getAuthAxios().put(URL + "/booking/" + id, {
        duration: booking.duration
      })
      setMsgColor('#4caf50');
      setStatusMessage('Duration updated successfully');
    } catch (error) {
      setStatusMessage(error.response.data.message);
      setMsgColor('#FF0000')
    }
  }

  return (
    <div className="centerContent">
      <h3>Edit Booking</h3>
      <p className="statusMsg" style={{ color: msgColor }}>{statusMessage}</p>
      <form onChange={handleInput}>
        <input className="form-control addInput" id="duration" placeholder="Enter desired duration" type="text"></input>
      </form>
      <button onClick={editBooking} className="btn btn-primary mt-3">Update</button>

    </div>
  )
}

export default EditBooking