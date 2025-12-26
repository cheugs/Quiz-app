// src/environments/environment.staging.ts

export const environment = {
  production: true, // Still true but staging environment
  
  // API Configuration
  api: {
    baseUrl: 'https://staging-api.equizz.com/api/v1',
    timeout: 60000, // 60 seconds
    retryAttempts: 3,
  },
  
  // Auth Configuration
  auth: {
    tokenStorageKey: 'equizz_staging_access_token',
    refreshTokenStorageKey: 'equizz_staging_refresh_token',
    userStorageKey: 'equizz_staging_user_data',
    tokenExpiryBuffer: 300, // 5 minutes in seconds
  },
  
  // App Configuration
  app: {
    name: 'EQuizz Admin Dashboard (Staging)',
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
    enableOfflineMode: true, // Test offline mode in staging
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
    googleAnalyticsId: 'UA-XXXXX-Z', // Separate staging GA ID
    sentryDsn: 'https://your-sentry-dsn@o450000.ingest.sentry.io/4500000000001',
    hotjarId: '',
  },
  
  // External Services
  services: {
    // Firebase
    firebase: {
      apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXX',
      authDomain: 'equizz-staging.firebaseapp.com',
      projectId: 'equizz-staging',
      storageBucket: 'equizz-staging.appspot.com',
      messagingSenderId: '123456789012',
      appId: '1:123456789012:web:abcdef1234567890',
      measurementId: 'G-XXXXXXXXXY',
    },
    
    // Sentry
    sentry: {
      dsn: 'https://your-sentry-dsn@o450000.ingest.sentry.io/4500000000001',
      environment: 'staging',
      tracesSampleRate: 0.5, // Higher sample rate for staging
    },
    
    // Pusher/WebSocket
    realtime: {
      enabled: true,
      host: 'ws-staging.equizz.com',
      port: 443,
      key: 'staging_key_123456',
      cluster: 'eu',
      forceTLS: true,
    },
  },
  
  // Storage Configuration
  storage: {
    localStoragePrefix: 'equizz_staging_',
    sessionStoragePrefix: 'equizz_staging_session_',
    cacheDuration: 5 * 60 * 1000, // 5 minutes
  },
  
  // Debug Settings
  debug: {
    enableLogging: true,
    logLevel: 'info', // More logging than prod but less than dev
    enableReduxDevTools: false,
    mockApiResponses: false,
    bypassAuth: false,
    showLoadingStates: true,
  },
  
  // URLs
  urls: {
    apiDocumentation: 'https://staging-api.equizz.com/api-docs',
    support: 'mailto:staging-support@equizz.com',
    privacyPolicy: 'https://staging.equizz.com/privacy',
    termsOfService: 'https://staging.equizz.com/terms',
    helpCenter: 'https://staging-help.equizz.com',
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
    encryptionKey: 'staging_encryption_key_123',
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