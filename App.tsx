import React, { useState } from 'react';
import { View, Button, Alert, FlatList, Text, Platform, PermissionsAndroid } from 'react-native';
import { getPairedDevices, printZPL } from './modules/zebra-link-os-module';

export default function App() {
  const [devices, setDevices] = useState<{ name: string; address: string }[]>([]);

  const requestBluetoothPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    try {
      const permissions: string[] = [];
      if (Platform.Version >= 31) {
        permissions.push(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN!,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT!
        );
      } else {
        permissions.push(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH!,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN!
        );
      }
      permissions.push(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION!
      );
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      return Object.values(granted).every(v => v === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn('Erro ao pedir permissões Bluetooth', err);
      return false;
    }
  };

  const load = async () => {
    const hasPermissions = await requestBluetoothPermissions();
    if (!hasPermissions) {
      Alert.alert('Permissões negadas', 'Não foi possível acessar o Bluetooth');
      return;
    }
    try {
      const list = await getPairedDevices();
      setDevices(list);
    } catch (e: any) {
      Alert.alert('Erro', e.message || 'Erro ao listar dispositivos');
    }
  };

  const imprimir = async (address: string) => {
    const zpl = `^XA^FO50,50^A0N,40,40^FDTeste ZQ620^FS^XZ`;
    try {
      await printZPL(address, zpl);
      Alert.alert('OK', 'Enviado para impressora');
    } catch (e: any) {
      Alert.alert('Erro', e.message || 'Falha na impressão');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Botão centralizado */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Button title="Listar pareados" onPress={load} />
      </View>

      <FlatList
        data={devices}
        keyExtractor={item => item.address}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>{item.name} — {item.address}</Text>
            <Button title="Imprimir nesta" onPress={() => imprimir(item.address)} />
          </View>
        )}
      />
    </View>
  );
}
