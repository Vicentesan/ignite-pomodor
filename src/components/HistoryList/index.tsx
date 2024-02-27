import { HistoryListContainer } from './styles'

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
            <td>Finished</td>
          </tr>
          <tr>
            <td>Task</td>
            <td>20 minutes</td>
            <td>2 weeks ago</td>
            <td>Finished</td>
          </tr>
          <tr>
            <td>Task</td>
            <td>20 minutes</td>
            <td>2 weeks ago</td>
            <td>Finished</td>
          </tr>
          <tr>
            <td>Task</td>
            <td>20 minutes</td>
            <td>2 weeks ago</td>
            <td>Finished</td>
          </tr>
        </tbody>
      </table>
    </HistoryListContainer>
  )
}
