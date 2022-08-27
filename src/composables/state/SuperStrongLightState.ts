import { State } from './type'
import type { Context } from '~/composables/state/Context'

export class SuperStrongLightState extends State {
  name = '激光'
  constructor(
    private context: Context,
  ) {
    super()
  }

  toggle() {
    debug('激光')
    this.context.setState(this.context.offLightState)
  }
}
