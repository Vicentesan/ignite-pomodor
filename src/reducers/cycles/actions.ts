import { Cycle } from '../../contexts/CyclesContext'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  MARK_CYCLE_AS_FINISHED = 'MARK_CYCLE_AS_FINISHED',
  ABORT_CYCLE = 'ABORT_CYCLE',
}

export function markCycleAsFinishedAction(activeCycleId: string) {
  return {
    type: ActionTypes.MARK_CYCLE_AS_FINISHED,
    payload: {
      activeCycleId,
    },
  }
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function aborCycleAction(activeCycleId: string) {
  return {
    type: ActionTypes.ABORT_CYCLE,
    payload: {
      activeCycleId,
    },
  }
}
