declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
    VUE_APP_FIREBASE_API_KEY: string
    VUE_APP_FIREBASE_AUTH_DOMAIN: string
    VUE_APP_FIREBASE_PROJECT_ID: string
    VUE_APP_FIREBASE_STORAGE_BUCKET: string
    VUE_APP_FIREBASE_MESSAGING_SENDER_ID: string
    VUE_APP_FIREBASE_APP_ID: string
  }
}
