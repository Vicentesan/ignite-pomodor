import { produce } from 'immer'

import { Cycle } from '../../contexts/CyclesContext'
import { ActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CyclesReducer(state: CyclesState, action: any): CyclesState {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.MARK_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (c) => c.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].status = 'finished'
        draft.activeCycleId = null
      })
    }
    case ActionTypes.ABORT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (c) => c.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].status = 'aborted'
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
