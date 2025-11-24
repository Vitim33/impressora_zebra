declare module 'zebra-link-os-module' {
  export function getPairedDevices(): Promise<Array<{ name: string; address: string }>>;
  export function printZPL(address: string, zpl: string): Promise<string>;
  export function connectAndInfo(address: string): Promise<{ model?: string; language?: string }>;
}
