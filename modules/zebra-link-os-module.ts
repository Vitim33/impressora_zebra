import { NativeModules } from 'react-native';

const { ZebraLinkOs } = NativeModules; 

export type PairedDevice = { name: string; address: string };

export const getPairedDevices = async (): Promise<PairedDevice[]> => {
  return ZebraLinkOs.getPairedDevices();
};

export const printZPL = async (address: string, zpl: string): Promise<string> => {
  return ZebraLinkOs.printZPL(address, zpl);
};

export const connectAndInfo = async (address: string): Promise<{ model?: string; language?: string }> => {
  return ZebraLinkOs.connectAndInfo(address);
};
