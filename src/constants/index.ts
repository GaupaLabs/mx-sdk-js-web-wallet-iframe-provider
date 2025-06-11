export const safeWindow = typeof window !== 'undefined' ? window : ({} as any);
export const safeDocument =
  typeof document !== 'undefined' ? document : ({} as any);

export const iframeWindowReadyEvent = 'iframeWindowReady';

export enum IframeLoginTypes {
  twitter = 'twitter',
  google = 'google',
  mail = 'mail',
  tiktok = 'tiktok'
}
