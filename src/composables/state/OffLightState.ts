import { State } from './type'
import type { Context } from '~/composables/state/Context'

export class OffLightState extends State {
  name = '弱光'
  constructor(
    private context: Context,
  ) {
    super()
  }

  toggle() {
    debug('弱光')
    this.context.setState(this.context.strongLightState)
  }
}
