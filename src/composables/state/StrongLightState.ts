import { State } from './type'
import type { Context } from '~/composables/state/Context'

export class StrongLightState extends State {
  name = '强光'
  constructor(
    private context: Context,
  ) {
    super()
  }

  toggle() {
    debug('强光')
    this.context.setState(this.context.strongLightState)
  }
}
