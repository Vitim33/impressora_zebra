import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  Text,
  UIManager,
  View
} from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrinterItem } from './components/PrinterItem';
import { useZebra } from './hooks/useZebra';
import { appStyles as styles } from './styles/appStyles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const { devices, loading, selected, paired, carregar, selecionar, imprimir } = useZebra();

  const pedirPermissao = async () => {
    if (Platform.OS !== 'android') return true;

    const perms = [
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, // necessário para varredura em Android 11-
    ];

    for (const perm of perms) {
      const res = await request(perm);
      if (res !== RESULTS.GRANTED) return false;
    }

    return true;
  };

  const carregarComPermissao = async () => {
    const ok = await pedirPermissao();
    if (!ok) return;
    carregar();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.titulo}>VOUCHER MOBILE</Text>

      <View style={styles.card}>

        <Pressable onPress={carregarComPermissao} style={styles.botao}>
          <Text style={styles.botaoTxt}>Listar Impressoras</Text>
        </Pressable>

        {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

        {!loading && (
          <FlatList
            data={devices}
            keyExtractor={item => item.address}
            style={{ width: '100%', marginTop: 10 }}
            renderItem={({ item }) => {
              const ativo = selected === item.address;

              return (
                <PrinterItem
                  item={item}
                  ativo={ativo}
                  onPress={() => selecionar(item)}
                  style={styles}
                />
              );
            }}
          />
        )}

        {paired && (
          <Pressable onPress={imprimir} style={[styles.botao, { marginTop: 20 }]}>
            <Text style={styles.botaoTxt}>Imprimir</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
