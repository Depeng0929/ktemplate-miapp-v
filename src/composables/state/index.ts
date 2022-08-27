import { OffLightState } from '~/composables/state/OffLightState';
import { StrongLightState } from '~/composables/state/StrongLightState';
import { SuperStrongLightState } from '~/composables/state/SuperStrongLightState';
import type { State } from '~/composables/state/type';
import { Context } from '~/composables/state/Context';

interface StateMap {
  [n: number]: State
}

const xstate = new Context()
const stateMap: StateMap = {
  0: new OffLightState(xstate),
  1: new StrongLightState(xstate),
  2: new SuperStrongLightState(xstate),
}

export function createState(status: number) {
  const state = stateMap[status]
  if (state)
    xstate.setState(state)

  return xstate
}
