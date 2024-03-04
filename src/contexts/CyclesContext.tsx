import { createContext, useEffect, useReducer, useState } from 'react'
import { CyclesReducer } from '../reducers/cycles/reducer'
import {
  aborCycleAction,
  addNewCycleAction,
  markCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  status: 'finished' | 'in progress' | 'aborted'
}

interface createCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (secounds: number) => void
  createNewCicle: (data: createCycleData) => void
  abortCycle: () => void
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  cycles: Cycle[]
}

export const CyclesContext = createContext<CyclesContextData>({
  markCurrentCycleAsFinished: () => {},
  setSecondsPassed: () => {},
  createNewCicle: () => {},
  abortCycle: () => {},
  activeCycle: undefined,
  amountSecondsPassed: 0,
  cycles: [],
})

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // const [cycles, setCycles] = useState<Cycle[]>([])
  const [cyclesState, dispatch] = useReducer(
    CyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-pomodor:cycles-state-1.0.0',
      )

      if (!storedStateAsJSON) return { cycles: [], activeCycleId: null }

      return JSON.parse(storedStateAsJSON)
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      const now = new Date()
      return differenceInSeconds(now, new Date(activeCycle.startedAt))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-pomodor:cycles-state-1.0.0', stateJSON) // a cool trick is to use a the application name in the local storage, also its cool to versonize the system to manage state changes
  }, [cyclesState])

  function markCurrentCycleAsFinished() {
    if (!activeCycle || !activeCycleId) return

    dispatch(markCycleAsFinishedAction(activeCycleId ?? activeCycle?.id))
    setAmountSecondsPassed(0)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCicle(data: createCycleData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
      status: 'in progress',
    }

    if (activeCycle) markCurrentCycleAsFinished()
    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function abortCycle() {
    if (activeCycle) {
      dispatch(aborCycleAction(activeCycleId ?? activeCycle.id))

      document.title = 'Ignite Timer'
    }
  }

  return (
    <CyclesContext.Provider
      value={{
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCicle,
        activeCycle,
        amountSecondsPassed,
        abortCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
