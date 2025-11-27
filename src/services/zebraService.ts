import { connectAndInfo, getPairedDevices, printZPL } from '../modules/zebra-link-os-module';

export async function listarZebra() {
  const list = await getPairedDevices();
  return list.filter(d => /zebra|zq|ql|zt/i.test(d.name?.trim() || ''));
}

export async function conectar(address: string) {
  return connectAndInfo(address);
}

export async function imprimirZPL(address: string) {
  const zpl =
    "^XA^PW800^LH0,0^CI28^FO20,40^A0N,35,35^FB760,1,0,L,0^FDTeste ZQ620 impressao sem corte^FS^XZ";

  return printZPL(address, zpl);
}
