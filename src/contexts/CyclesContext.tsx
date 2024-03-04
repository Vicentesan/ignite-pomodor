import { createContext, useState } from 'react'

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
}

export const CyclesContext = createContext<CyclesContextData>({
  markCurrentCycleAsFinished: () => {},
  setSecondsPassed: () => {},
  createNewCicle: () => {},
  abortCycle: () => {},
  activeCycle: undefined,
  amountSecondsPassed: 0,
})

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const activeCycle = cycles.find((c) => c.id === activeCycleId)

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

  function createNewCicle(data: createCycleData) {
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

    // reset() TODO
  }

  function abortCycle() {
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

  return (
    <CyclesContext.Provider
      value={{
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCicle,
        activeCycle,
        amountSecondsPassed,
        abortCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
