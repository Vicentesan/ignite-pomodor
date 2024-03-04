import { useContext, useEffect } from 'react'
import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'

export function CountDown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const cycleMinutesAmountInSecound = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const now = new Date()
        const diff = differenceInSeconds(now, new Date(activeCycle.startedAt))

        if (diff >= cycleMinutesAmountInSecound) {
          markCurrentCycleAsFinished()
          document.title = 'Ignite Timer'

          clearInterval(interval)

          return
        }

        setSecondsPassed(diff)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    cycleMinutesAmountInSecound,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])
  const currentseconds = activeCycle
    ? cycleMinutesAmountInSecound - amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentseconds / 60)
  const secondsAmount = currentseconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds} - Ignite Timer`
  }, [activeCycle, minutes, seconds])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
