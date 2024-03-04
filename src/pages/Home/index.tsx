import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CountDown } from '../../components/CountDown'
import {
  AbortCountDownButton,
  HomeContainer,
  StartCountDownButton,
} from './styles'
import { NewCycleForm } from '../../components/NewCycleForm'

const newCycleFormSchema = z.object({
  task: z.string().min(1),
  minutesAmount: z.number().min(5).max(60),
})

export type NewCycleFormSchema = z.infer<typeof newCycleFormSchema>

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  status: 'finished' | 'in progress' | 'aborted'
}

interface CyclesContextData {
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (secounds: number) => void
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
}

export const CyclesContext = createContext<CyclesContextData>({
  markCurrentCycleAsFinished: () => {},
  setSecondsPassed: () => {},
  activeCycle: undefined,
  amountSecondsPassed: 0,
})

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const newCycleForm = useForm<NewCycleFormSchema>()

  const { reset, handleSubmit, watch } = newCycleForm

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((c) => {
        if (c.id === activeCycleId) {
          return {
            ...c,
            status: 'finished',
          }
        }

        return c
      }),
    )
    setAmountSecondsPassed(0)
    setActiveCycleId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  function handleCreateNewCicle(data: NewCycleFormSchema) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
      status: 'in progress',
    }

    if (activeCycle) markCurrentCycleAsFinished()
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleAbortCycle() {
    if (activeCycle) {
      setCycles((state) =>
        state.map((c) => {
          if (c.id === activeCycle.id) {
            return {
              ...c,
              status: 'aborted',
            }
          }

          return c
        }),
      )

      setActiveCycleId(null)
      document.title = 'Ignite Timer'
    }
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <CyclesContext.Provider
          value={{
            markCurrentCycleAsFinished,
            setSecondsPassed,
            activeCycle,
            amountSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <AbortCountDownButton onClick={handleAbortCycle} type="button">
            <HandPalm size="24" />
            Abort
          </AbortCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size="24" />
            Start
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
