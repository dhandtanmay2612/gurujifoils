/// <reference types="vite/client" />

// Add path alias type definitions
declare module '@/*' {
  const value: any
  export default value
}
