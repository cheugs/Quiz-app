// src/environments/environment.ts

export const environment = {
  production: false,
  
  // API Configuration
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },
  
  // Auth Configuration
  auth: {
    tokenStorageKey: 'equizz_access_token',
    refreshTokenStorageKey: 'equizz_refresh_token',
    userStorageKey: 'equizz_user_data',
    tokenExpiryBuffer: 300, // 5 minutes in seconds
  },
  
  // App Configuration
  app: {
    name: 'EQuizz Admin Dashboard',
    version: '1.0.0',
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'fr'],
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.csv'],
  },
  
  // Feature Flags
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    enableOfflineMode: false,
    enableExportPdf: true,
    enableExportExcel: true,
    enableBulkActions: true,
    enableDarkMode: true,
    enableMultiLanguage: true,
    enableFileUpload: true,
    enableRealTimeUpdates: true,
  },
  
  // Analytics Configuration
  analytics: {
    googleAnalyticsId: '', // Empty for development
    sentryDsn: '', // Empty for development
    hotjarId: '',
  },
  
  // External Services
  services: {
    // Firebase (if using)
    firebase: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: '',
    },
    
    // Sentry (error tracking)
    sentry: {
      dsn: '',
      environment: 'development',
      tracesSampleRate: 0.1,
    },
    
    // Pusher/WebSocket (realtime)
    realtime: {
      enabled: false,
      host: 'localhost',
      port: 6001,
      key: 'local_key',
      cluster: 'mt1',
      forceTLS: false,
    },
  },
  
  // Storage Configuration
  storage: {
    localStoragePrefix: 'equizz_',
    sessionStoragePrefix: 'equizz_session_',
    cacheDuration: 5 * 60 * 1000, // 5 minutes
  },
  
  // Debug Settings
  debug: {
    enableLogging: true,
    logLevel: 'debug', // 'debug', 'info', 'warn', 'error'
    enableReduxDevTools: true,
    mockApiResponses: false,
    bypassAuth: false, // Only for development
    showLoadingStates: true,
  },
  
  // URLs
  urls: {
    apiDocumentation: 'http://localhost:3000/api-docs',
    support: 'mailto:support@equizz.com',
    privacyPolicy: 'http://localhost:4200/privacy',
    termsOfService: 'http://localhost:4200/terms',
    helpCenter: 'http://localhost:4200/help',
  },
  
  // Timeouts
  timeouts: {
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    idleTimeout: 15 * 60 * 1000, // 15 minutes
    toastDuration: 5000, // 5 seconds
    debounceSearch: 300, // 300ms
  },
  
  // Security
  security: {
    encryptionKey: 'dev_encryption_key_123', // Change in production
    passwordMinLength: 8,
    passwordRequiresUppercase: true,
    passwordRequiresLowercase: true,
    passwordRequiresNumbers: true,
    passwordRequiresSpecialChars: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  },
  
  // Performance
  performance: {
    lazyLoadDelay: 200,
    imageCompressionQuality: 0.8,
    enableImageLazyLoading: true,
    enableComponentCaching: true,
    enableRoutePreloading: true,
  },
};