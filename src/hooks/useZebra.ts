import { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { conectar, imprimirZPL, listarZebra } from '../services/zebraService';

export function useZebra() {
  const [devices, setDevices] = useState<{ name: string; address: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [paired, setPaired] = useState(false);

  const carregar = async () => {
    setLoading(true);
    try {
      const list = await listarZebra();
      LayoutAnimation.easeInEaseOut();
      setDevices(list);
    } finally {
      setLoading(false);
    }
  };

  const selecionar = async (item: { name: string; address: string }) => {
    setSelected(item.address);
    setPaired(false);

    try {
      await conectar(item.address);
      setPaired(true);
    } catch {
      setPaired(false);
    }
  };

  const imprimir = async () => {
    if (!selected) return;
    await imprimirZPL(selected);
  };

  return { devices, loading, selected, paired, carregar, selecionar, imprimir };
}
