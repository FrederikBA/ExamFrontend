import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils";
import axios from "axios";

const CreateAssistant = () => {
  const [assistant, setAssistant] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [assistants, setAssistants] = useState([]);

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
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="centerContent">
        <h4>Enter details of newly hired washing assistant</h4>

        <p className="statusMsg" style={{ color: msgColor }}>{statusMessage}</p>
        <form onChange={handleInput} className="form-group">
          <input className="form-control addInput" id="name" placeholder="Enter name" type="text"></input>
          <input className="form-control addInput" id="language" placeholder="Enter language" type="text"></input>
          <input className="form-control addInput" id="experience" placeholder="Enter experience" type="text"></input>
          <input className="form-control addInput" id="pricePrHour" placeholder="Enter salary per hour" type="text"></input>
        </form>
        <button onClick={createAssistant} className="btn btn-primary addButton">Add Assistant</button>
      </div>
    </div>
  )
}

export default CreateAssistant