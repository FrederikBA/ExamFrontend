import { useState, useEffect } from "react"
import apiUtils from "../utils/apiUtils"

const AssistantTable = () => {
  const [assistants, setAssistants] = useState([]);

  const URL = apiUtils.getUrl()

  useEffect(() => {
    const getAssistants = async () => {
      const response = await apiUtils.getAuthAxios().get(URL + '/assistant/all')
      setAssistants(response.data.assistants);
    }
    getAssistants()
  }, [URL]);

  return (
    <div className="centerContent">
      <h1>Available assistents</h1>
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
  )
}

export default AssistantTable