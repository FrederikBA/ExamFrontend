import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils";
import axios from "axios";
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

const ManageAssistants = () => {
  const [assistant, setAssistant] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [assistants, setAssistants] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [assistantId, setAssistantId] = useState(0);

  const URL = apiUtils.getUrl()

  useEffect(() => {
    const getAssistants = async () => {
      const response = await axios.get(URL + '/assistant/unprotectedall')
      setAssistants(response.data.assistants);
    }
    getAssistants()
  }, [URL]);

  const handleInput = (event) => {
    setAssistant({ ...assistant, [event.target.id]: event.target.value })
  }

  const openModal = async (id) => {
    setIsOpen(true);
    setAssistantId(id)

  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const createAssistant = async () => {
    try {
      await apiUtils.getAuthAxios().post(URL + '/assistant', {
        name: assistant.name,
        language: assistant.language,
        experience: assistant.experience,
        pricePrHour: assistant.pricePrHour
      })
      setMsgColor('#4caf50');
      setStatusMessage('Assistant Added Successfully!');

      //Update list of assistants
      const response = await axios.get(URL + '/assistant/unprotectedall')
      setAssistants(response.data.assistants)

    } catch (error) {
      setStatusMessage(error.response.data.message);
      setMsgColor('#FF0000')
    }
  }

  const editAssistant = async () => {
    try {
      await apiUtils.getAuthAxios().put(URL + '/assistant/' + assistantId, {
        name: assistant.name,
        language: assistant.language,
        experience: assistant.experience,
        pricePrHour: assistant.pricePrHour
      })
      setIsOpen(false)

      //Update list of assistants
      const response = await axios.get(URL + '/assistant/unprotectedall')
      setAssistants(response.data.assistants)

    } catch (error) {
      setStatusMessage(error.response.data.message);
      setMsgColor('#FF0000')
    }
  }

  return (
    <div>
      <div className="centerContent">
        <h4>Employees</h4>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Language</th>
              <th>Experience (in years)</th>
              <th>Price per hour (in DKK)</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {assistants.map((a) =>
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.language}</td>
                <td>{a.experience}</td>
                <td>{a.pricePrHour},-</td>
                <td><button onClick={() => openModal(a.id)} className="btn btn-primary">Edit</button></td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="centerContent">
        <h4>Create assistant</h4>

        <p className="statusMsg" style={{ color: msgColor }}>{statusMessage}</p>
        <form onChange={handleInput} className="form-group">
          <input className="form-control addInput" id="name" placeholder="Enter name" type="text"></input>
          <input className="form-control addInput" id="language" placeholder="Enter language" type="text"></input>
          <input className="form-control addInput" id="experience" placeholder="Enter experience" type="text"></input>
          <input className="form-control addInput" id="pricePrHour" placeholder="Enter salary per hour" type="text"></input>
        </form>
        <button onClick={createAssistant} className="btn btn-primary addButton">Add Assistant</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="centerContent modalContent">
          <h4>Update Assistant</h4>
          <form onChange={handleInput} className="form-group">
            <input className="form-control addInput" id="name" placeholder="Enter name" type="text"></input>
            <input className="form-control addInput" id="language" placeholder="Enter language" type="text"></input>
            <input className="form-control addInput" id="experience" placeholder="Enter experience" type="text"></input>
            <input className="form-control addInput" id="pricePrHour" placeholder="Enter salary per hour" type="text"></input>
          </form>
          <button onClick={editAssistant} className="btn btn-primary addButton">Edit Assistant</button>
        </div>
      </Modal >
    </div>
  )
}

export default ManageAssistants