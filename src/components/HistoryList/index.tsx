import { useContext } from 'react'
import { Status, HistoryListContainer } from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'

export function HistoryList() {
  const { cycles } = useContext(CyclesContext)

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
          {cycles.map(({ id, task, minutesAmount, startedAt, status }) => {
            const statusColor =
              status === 'aborted'
                ? 'red'
                : status === 'finished'
                  ? 'green'
                  : 'yellow'

            return (
              <tr key={id}>
                <td>{task}</td>
                <td>{minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(new Date(startedAt), {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  <Status statusColor={statusColor}>
                    {status === 'in progress'
                      ? 'In Progress'
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Status>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </HistoryListContainer>
  )
}
