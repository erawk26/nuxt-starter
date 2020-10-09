import LRU from 'lru-cache'
const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60 // 1 hour
})
export default {
  icons: {
    iconfont: 'md' // default - only for display purposes
  },
  defaultAssets: false,
  treeShake: true,
  theme: {
    dark: false,
    options: { themeCache },
    themes: {
      dark: {
        // primary: '#263238',
        // primary: '#342a21',
        primary: '#04b55c'
        // accent: '#C67171',
        // secondary: '#26A5B5',
        // success: '#4CAF50',
        // info: '#2196F3',
        // warning: '#FB8C00',
        // error: '#FF5252',
        // primary: '#3b8070'
      },
      light: {
        primary: '#3b8070'
        // accent: '#F44336',
        // secondary: '#757575',
        // accent: '#0277BD',
        // success: '#4CAF50',
        // info: '#2196F3',
        // warning: '#FB8C00',
        // error: '#FF5252',
        // charcoal: '#342a21'
      }
    }
  }
}
