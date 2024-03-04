import { Cycle } from '../../contexts/CyclesContext'
import { ActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesReducer(state: CyclesState, action): CyclesState {
  if (!action.payload.activeCycleId || !action.payload.newCycle)
    throw new Error('Action payload is missing data.')

  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case ActionTypes.MARK_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((c: Cycle) => {
          if (c.id === action.payload.activeCycleId) {
            return {
              ...c,
              status: 'finished',
            }
          }
          return c
        }),
        activeCycleId: null,
      }
    case ActionTypes.ABORT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((c: Cycle) => {
          if (c.id === action.payload.activeCycleId) {
            return {
              ...c,
              status: 'aborted',
            }
          }
          return c
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
