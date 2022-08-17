import type { InjectionKey, Ref } from 'vue'
import config from '~/config.json';

export const STORAGE_KEY = `__${config.project_name}_token__`

// provider example
export const injectionClicks: InjectionKey<Ref<number>> = Symbol('v-click-clicks')
