/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Your project's public key (ab_live_...) from Abrova Console. */
  readonly VITE_ABROVA_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
