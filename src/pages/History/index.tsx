import { HistoryList } from '../../components/HistoryList'
import { HistoryContainer } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>My History</h1>

      <HistoryList />
    </HistoryContainer>
  )
}
