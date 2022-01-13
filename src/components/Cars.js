import apiUtils from "../utils/apiUtils"
import { useState, useEffect } from "react"
import Modal from 'react-modal';

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


const Cars = () => {
  const [car, setCar] = useState({});
  const [cars, setCars] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [carId, setCarId] = useState();
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const URL = apiUtils.getUrl()

  useEffect(() => {
    const getCars = async () => {
      const response = await apiUtils.getAuthAxios().get(URL + '/car/all')
      setCars(response.data.cars);
    }
    getCars()
  }, [URL]);

  const handleInput = (event) => {
    setCar({ ...car, [event.target.id]: event.target.value })
  }


  const openModal = async (id) => {
    setCarId(id)
    setIsOpen(true);

  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const editCar = async () => {
    try {
      await apiUtils.getAuthAxios().put(URL + '/car/' + carId, {
        regNumber: car.regNumber,
        model: car.model,
        make: car.make,
        year: car.year
      })
      setIsOpen(false)

      //Update list of cars
      const response = await apiUtils.getAuthAxios().get(URL + '/car/all')
      setStatusMessage('Car updated successfully');
      setMsgColor('#4caf50')
      setCars(response.data.cars);

    } catch (error) {
      setStatusMessage(error.response.data.message);
      setMsgColor('#FF0000')
      setIsOpen(false)
    }
  }

  return (
    <div className="centerContent">
      <h4>Cars</h4>
      <p className="statusMsg" style={{ color: msgColor }}>{statusMessage}</p>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Registration</th>
            <th>Model</th>
            <th>Make</th>
            <th>Year</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((c) =>
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.regNumber}</td>
              <td>{c.model}</td>
              <td>{c.make}</td>
              <td>{c.year},-</td>
              <td><button onClick={() => openModal(c.id)} className="btn btn-primary">Edit</button></td>
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
          <h4>Updating Car: {carId}</h4>
          <form onChange={handleInput} className="form-group">
            <input className="form-control addInput" id="regNumber" placeholder="Enter registration number" type="text"></input>
            <input className="form-control addInput" id="model" placeholder="Enter model" type="text"></input>
            <input className="form-control addInput" id="make" placeholder="Enter make" type="text"></input>
            <input className="form-control addInput" id="year" placeholder="Enter year" type="text"></input>
          </form>
          <button onClick={editCar} className="btn btn-primary addButton">Update</button>
        </div>
      </Modal >
    </div>
  )
}

export default Cars