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
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormSchema = z.object({
  task: z.string().min(1),
  minutesAmount: z.number().min(5).max(120),
})

type NewCycleFormSchema = z.infer<typeof newCycleFormSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  status: 'finished' | 'in progress' | 'aborted'
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecoundsPassed, setAmountSecoundsPassed] = useState<number>(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormSchema>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  useEffect(() => {
    if (activeCycle)
      setInterval(() => {
        const now = new Date()
        const diff = differenceInSeconds(now, activeCycle.startedAt)
        setAmountSecoundsPassed(diff)
      }, 1000)
  }, [activeCycle])

  function handleCreateNewCicle(data: NewCycleFormSchema) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
      status: 'in progress',
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  const cycleMinutesAmountInSecound = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0
  const currentSecounds = activeCycle
    ? cycleMinutesAmountInSecound - amountSecoundsPassed
    : 0

  const minutesAmount = Math.floor(currentSecounds / 60)
  const secoundsAmount = currentSecounds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const secounds = String(secoundsAmount).padStart(2, '0')

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

        <CountDown minutes={minutes} secounds={secounds} />

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size="24" />
          Start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
