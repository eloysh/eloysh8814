declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_WHATSAPP_LINK: string;
    GOOGLE_SITE_VERIFICATION?: string;
  }
}
declare module "./components/AudioList" {
  const C: React.ComponentType<{ tracks: never[] }>;
  export default C;
}
