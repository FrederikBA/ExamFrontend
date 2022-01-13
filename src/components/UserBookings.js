import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const UserBookings = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [bookingId, setBookingId] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [assistants, setAssistants] = useState([]);

  const URL = apiUtils.getUrl()

  useEffect(() => {
    const getBookings = async () => {
      const response = await apiUtils.getAuthAxios().get(URL + '/booking/' + localStorage.getItem('user'))
      setBookings(response.data.bookings);
    }
    getBookings()
  }, [URL]);

  const openModal = async (id) => {
    setBookingId(id)
    setIsOpen(true);
    const response = await axios.get(URL + '/assistant/booking/' + id)
    setAssistants(response.data.assistants);

  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="centerContent">
      <h1>Hello {localStorage.getItem('user')}, these are your bookings</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Booking Created</th>
            <th>Duration of car wash (in minutes)</th>
            <th>Car (Registration Number)</th>
            <th>See assigned washing assisstant(s)</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) =>
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.created}</td>
              <td>{b.duration}</td>
              <td>{b.car.regNumber}</td>
              <td><button onClick={() => openModal(b.id)} className="btn btn-primary">View</button></td>
            </tr>)}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="centerContent modalContent">
          <p>Washing assistants assigned to booking ID: {bookingId}</p>
          <ul className="list-group">
            {assistants.map((a) =>
              <li className="list-group-item" key={a.id}>
                {a.name}: {a.pricePrHour},- DKK/hour
              </li>)}
          </ul>
        </div>
      </Modal >
    </div >
  )
}

export default UserBookings