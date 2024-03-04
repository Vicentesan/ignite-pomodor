import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CountDown } from '../../components/CountDown'
import { NewCycleForm } from '../../components/NewCycleForm'
import {
  AbortCountDownButton,
  HomeContainer,
  StartCountDownButton,
} from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormSchema = z.object({
  task: z.string().min(1),
  minutesAmount: z.number().min(5).max(60),
})

export type NewCycleFormSchema = z.infer<typeof newCycleFormSchema>

export function Home() {
  const newCycleForm = useForm<NewCycleFormSchema>()

  const { createNewCicle, abortCycle, activeCycle } = useContext(CyclesContext)
  const { reset, handleSubmit, watch } = newCycleForm

  function handleNewCycleSubmit(data: NewCycleFormSchema) {
    createNewCicle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycleSubmit)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <AbortCountDownButton onClick={abortCycle} type="button">
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
