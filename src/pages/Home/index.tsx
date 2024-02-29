import { Play } from 'phosphor-react'
import { CountDown } from '../../components/CountDown'
import {
  StartCountDownButton,
  FormContainer,
  HomeContainer,
  TaskInput,
  MinutesAmountInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const newCycleFormSchema = z.object({
  task: z.string().min(1),
  minutesAmount: z.number().min(5).max(120),
})

type NewCycleFormSchema = z.infer<typeof newCycleFormSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  status: 'finished' | 'in progress' | 'aborted'
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormSchema>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCicle(data: NewCycleFormSchema) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      status: 'in progress',
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">I&apos;ll work in</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give your project a name"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 01" />
            <option value="Project 02" />
            <option value="Project 03" />
            <option value="BANANA" />
          </datalist>

          <label htmlFor="minutesAmount">during</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={2}
            min={5}
            max={120}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDown />

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size="24" />
          Start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
