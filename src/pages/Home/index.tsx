import { Play } from 'phosphor-react'
import { CountDown } from '../../components/CountDown'
import {
  StartCountDownButton,
  FormContainer,
  HomeContainer,
  TaskInput,
  MinutesAmountInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I&apos;ll work in</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give your project a name"
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
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDown />

        <StartCountDownButton type="submit">
          <Play size="24" />
          Start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
