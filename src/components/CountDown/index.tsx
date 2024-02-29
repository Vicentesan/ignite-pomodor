import { CountDownContainer, Separator } from './styles'

interface CountDownProps {
  minutes: string
  secounds: string
}

export function CountDown({ minutes, secounds }: CountDownProps) {
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{secounds[0]}</span>
      <span>{secounds[1]}</span>
    </CountDownContainer>
  )
}
