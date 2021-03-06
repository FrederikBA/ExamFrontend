import { useState, useEffect } from "react";
import axios from "axios";
import apiUtils from "../utils/apiUtils";
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

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

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [bookingId, setBookingId] = useState(0);
  const [assistants, setAssistants] = useState([]);

  const URL = apiUtils.getUrl()

  useEffect(() => {
    const getBookings = async () => {
      const response = await apiUtils.getAuthAxios().get(URL + '/booking/all')
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

  const deleteBooking = async (id) => {
    await apiUtils.getAuthAxios().delete(URL + '/booking/' + id)

    //Fetch the updated bookings list
    const response = await axios.get(URL + '/booking/all')
    setBookings(response.data.bookings)
  }

  return (
    <div className="centerContent">
      <h1>All bookings</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Last update</th>
            <th>Duration of car wash (in minutes)</th>
            <th>Car (Registration Number)</th>
            <th>See assigned washing assisstant(s)</th>
            <th>Assign washing assistents</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) =>
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user}</td>
              <td>{b.created}</td>
              <td>{b.duration}</td>
              <td>{b.car.regNumber}</td>
              <td><button onClick={() => openModal(b.id)} className="btn btn-primary">View</button></td>
              <td><NavLink to={`/assign-assistants/${b.id}`}><button className="btn btn-primary">Assign</button></NavLink></td>
              <td><NavLink to={`/edit-booking/${b.id}`}><button className="btn btn-primary">Edit</button></NavLink></td>
              <td><button onClick={() => deleteBooking(b.id)} className="btn btn-danger">Delete</button></td>
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
    </div>
  )
}

export default Bookings;