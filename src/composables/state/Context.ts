import type { State } from './type'
import { OffLightState } from '~/composables/state/OffLightState'
import { StrongLightState } from '~/composables/state/StrongLightState'
import { SuperStrongLightState } from '~/composables/state/SuperStrongLightState'

export class Context {
  public currState: State
  public offLightState: OffLightState
  public strongLightState: StrongLightState
  public superStrongLightState: SuperStrongLightState

  constructor() {
    this.offLightState = new OffLightState(this)
    this.strongLightState = new StrongLightState(this)
    this.superStrongLightState = new SuperStrongLightState(this)
    this.currState = this.offLightState
  }

  setState(state: State) {
    this.currState = state
  }

  next() {
    this.currState.toggle()
  }
}
