import { CountDownContainer, Separator } from './styles'

export function CountDown() {
  return (
    <CountDownContainer>
      <span>0</span>
      <span>0</span>
      <Separator>:</Separator>
      <span>0</span>
      <span>0</span>
    </CountDownContainer>
  )
}
