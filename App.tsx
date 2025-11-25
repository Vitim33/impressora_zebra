import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPairedDevices, printZPL } from './modules/zebra-link-os-module';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [mac, setMac] = useState('');
  const [devices, setDevices] = useState<{ name: string; address: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const macValido = /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/i.test(mac);
  const macIncompleto = mac.length > 0 && !macValido;

  const formatarMAC = (v: string) => {
    v = v.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    let out = '';
    for (let i = 0; i < v.length; i += 2) {
      out += v.substring(i, i + 2);
      if (i < 10) out += ':';
    }
    if (out.endsWith(':')) out = out.slice(0, -1);
    return out;
  };

  const onChangeMac = (t: string) => {
    const novo = formatarMAC(t);
    setMac(novo);
  };

  const carregar = async () => {
    try {
      setLoading(true);
      const list = await getPairedDevices();
      const filtradas = list.filter(d => /zebra|zq|ql|zt/i.test(d.name));
      LayoutAnimation.easeInEaseOut();
      setDevices(filtradas);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const selecionar = (item: { name: string; address: string }) => {
    setSelected(item.address);
    setMac(item.address);
  };

  const imprimir = async () => {
    if (!macValido) return;
    try {
      const zpl = `^XA^FO50,50^A0N,40,40^FDTeste ZQ620^FS^XZ`;
      await printZPL(mac, zpl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.titulo}>VOUCHER MOBILE</Text>

      <View style={styles.card}>
        <TextInput
          value={mac}
          onChangeText={onChangeMac}
          placeholder="Endereço MAC"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        {macIncompleto && (
          <Text style={styles.msgErro}>MAC incompleto</Text>
        )}

        <Pressable onPress={carregar} style={styles.botao}>
          <Text style={styles.botaoTxt}>Listar Impressoras</Text>
        </Pressable>

        <Pressable
          onPress={imprimir}
          disabled={!macValido}
          style={[styles.botao, !macValido && styles.botaoDesabilitado]}
        >
          <Text style={styles.botaoTxt}>Imprimir</Text>
        </Pressable>

        <Pressable onPress={carregar} style={styles.refresh}>
          <Text style={styles.refreshTxt}>↻</Text>
        </Pressable>

        {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

        {!loading && (
          <FlatList
            data={devices}
            keyExtractor={item => item.address}
            renderItem={({ item }) => {
              const ativo = selected === item.address;
              return (
                <Pressable
                  onPress={() => selecionar(item)}
                  style={[styles.item, ativo && styles.itemAtivo]}
                >
                  <Text style={[styles.itemTxt, ativo && styles.itemTxtAtivo]}>
                    {item.name} — {item.address}
                  </Text>
                </Pressable>
              );
            }}
            style={{ width: '100%', marginTop: 10 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF7A00',
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 18,
    color: '#000',
  },
  msgErro: {
    color: 'red',
    marginTop: 6,
    fontSize: 14,
  },
  botao: {
    marginTop: 20,
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.4,
  },
  botaoTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  refresh: {
    alignSelf: 'center',
    marginTop: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#FFE0C2',
  },
  refreshTxt: {
    fontSize: 22,
    color: '#FF7A00',
    fontWeight: 'bold',
  },
  item: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f6f6f6',
    marginBottom: 8,
  },
  itemAtivo: {
    backgroundColor: '#FF7A00',
  },
  itemTxt: {
    color: '#333',
  },
  itemTxtAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
