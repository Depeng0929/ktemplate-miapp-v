import { objectKeys } from '@depeng9527/tools'
import mimeTypes from './mime-types.json'

const fileTypeLookup = {} as Record<string, string>
objectKeys(mimeTypes).forEach((key) => {
  const extensions = (mimeTypes as any)[key] as string[]
  extensions.forEach((extension) => {
    fileTypeLookup[extension] = key
  })
})

export function fileType(path: string) {
  const index = path.lastIndexOf('.')
  if (index === -1)
    return null
  const ext = path.slice(index + 1)

  return fileTypeLookup[ext.toLowerCase()]
}

export function isVideo(path: string) {
  const type = fileType(path)
  if (!type)
    return false

  return type.includes('video')
}
