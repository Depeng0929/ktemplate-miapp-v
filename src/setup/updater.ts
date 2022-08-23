import { alert, confirm } from '~/utils'

export function checkVersion() {
  onLaunch(() => {
    if (uni.canIUse('getUpdateManager') && uni.getUpdateManager) {
      const updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            confirm('新版本已经准备好，是否重启应用？')
              .then(() => {
                updateManager.applyUpdate()
              })
          })
          updateManager.onUpdateFailed(() => {
            alert('新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~')
          })
        }
      })
    }
  })
}
