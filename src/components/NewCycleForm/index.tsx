import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I&apos;ll work in</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Give your project a name"
        disabled={!!activeCycle}
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
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
