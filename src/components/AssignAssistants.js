import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"

const AssignAssistants = () => {
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistants, setSelectedAssistants] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const URL = apiUtils.getUrl()
  const id = parseInt(useParams().id)

  useEffect(() => {
    const getAssistants = async () => {
      const response = await axios.get(URL + '/assistant/unprotectedall')
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

  const editAssistants = async () => {
    try {
      await apiUtils.getAuthAxios().put(URL + "/booking/assistants/" + id, {
        assistants: selectedAssistants
      })
      setMsgColor('#4caf50');
      setStatusMessage('Assistants assigned successfully!');
    } catch (error) {
      setStatusMessage(error.response.data.message);
      setMsgColor('#FF0000')
    }
  }

  return (
    <div className="centerContent">
      <h3>Asign employees to booking number: {id}  </h3>
      <p className="statusMsg" style={{ color: msgColor }}>{statusMessage}</p>
      <ul>
        {assistants.map((a) =>
          <li key={a.id}>
            {a.name} <input onChange={(event) => addAssistant(event.target.value, event.target.checked)} type="checkbox" id="assistantId" name={a.name} value={a.id}></input>
          </li>)}
      </ul>
      <button onClick={editAssistants} className="btn btn-primary editButton">Update Assistants</button>
    </div>
  )
}

export default AssignAssistants