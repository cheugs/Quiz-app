// src/environments/environment.prod.ts

export const environment = {
  production: true,
  
  // API Configuration
  api: {
    baseUrl: 'https://api.equizz.com/api/v1',
    timeout: 60000, // 60 seconds
    retryAttempts: 2,
  },
  
  // Auth Configuration
  auth: {
    tokenStorageKey: 'equizz_prod_access_token',
    refreshTokenStorageKey: 'equizz_prod_refresh_token',
    userStorageKey: 'equizz_prod_user_data',
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
    googleAnalyticsId: 'UA-XXXXX-Y', // Replace with actual GA ID
    sentryDsn: 'https://your-sentry-dsn@o450000.ingest.sentry.io/4500000000000',
    hotjarId: '1234567',
  },
  
  // External Services
  services: {
    // Firebase
    firebase: {
      apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXX',
      authDomain: 'equizz-prod.firebaseapp.com',
      projectId: 'equizz-prod',
      storageBucket: 'equizz-prod.appspot.com',
      messagingSenderId: '123456789012',
      appId: '1:123456789012:web:abcdef1234567890',
      measurementId: 'G-XXXXXXXXXX',
    },
    
    // Sentry
    sentry: {
      dsn: 'https://your-sentry-dsn@o450000.ingest.sentry.io/4500000000000',
      environment: 'production',
      tracesSampleRate: 0.1,
    },
    
    // Pusher/WebSocket
    realtime: {
      enabled: true,
      host: 'ws.equizz.com',
      port: 443,
      key: 'prod_key_123456',
      cluster: 'eu',
      forceTLS: true,
    },
  },
  
  // Storage Configuration
  storage: {
    localStoragePrefix: 'equizz_prod_',
    sessionStoragePrefix: 'equizz_prod_session_',
    cacheDuration: 5 * 60 * 1000, // 5 minutes
  },
  
  // Debug Settings
  debug: {
    enableLogging: false,
    logLevel: 'error', // Only log errors in production
    enableReduxDevTools: false,
    mockApiResponses: false,
    bypassAuth: false,
    showLoadingStates: true,
  },
  
  // URLs
  urls: {
    apiDocumentation: 'https://api.equizz.com/api-docs',
    support: 'mailto:support@equizz.com',
    privacyPolicy: 'https://equizz.com/privacy',
    termsOfService: 'https://equizz.com/terms',
    helpCenter: 'https://help.equizz.com',
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
    encryptionKey: process.env['ENCRYPTION_KEY'] || '', // Should be set via environment variable
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