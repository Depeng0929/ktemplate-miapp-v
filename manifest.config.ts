// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest';

export default defineManifestConfig({
  'name': '[project-name]',
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'mp-weixin': {
    appid: 'wx0784eaab8d8f7721',
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
  },
  'mp-alipay': {
    usingComponents: true,
  },
});
