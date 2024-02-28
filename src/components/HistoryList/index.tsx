import { Status, HistoryListContainer } from './styles'

export function HistoryList() {
  return (
    <HistoryListContainer>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Duration</th>
            <th>Started</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Task</td>
            <td>20 minutes</td>
            <td>2 weeks ago</td>
            <td>
              <Status statusColor="yellow">In Progress</Status>
            </td>
          </tr>
          <tr>
            <td>Task</td>
            <td>20 minutes</td>
            <td>2 weeks ago</td>
            <td>
              <Status statusColor="green">Finished</Status>
            </td>
          </tr>
          <tr>
            <td>Task</td>
            <td>20 minutes</td>
            <td>2 weeks ago</td>
            <td>
              <Status statusColor="red">Aborted</Status>
            </td>
          </tr>
        </tbody>
      </table>
    </HistoryListContainer>
  )
}
