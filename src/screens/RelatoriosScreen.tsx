import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RelatoriosScreen: React.FC = () => {
  const [base, setBase] = useState('');
  const [periodoInicial, setPeriodoInicial] = useState('');
  const [periodoFinal, setPeriodoFinal] = useState('');
  const [numeroVoo, setNumeroVoo] = useState('');
  const [tipo, setTipo] = useState('');
  const [localizadorPNR, setLocalizadorPNR] = useState('');

  const handleFiltrar = () => {
    console.log('Filtrar com:', {
      base,
      periodoInicial,
      periodoFinal,
      numeroVoo,
      tipo,
      localizadorPNR,
    });
  };

  const handleExportarCSV = () => {
    console.log('Exportar CSV com:', {
      base,
      periodoInicial,
      periodoFinal,
      numeroVoo,
      tipo,
      localizadorPNR,
    });
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.headerText}>
            Relatórios
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.row}>
            <TextInput
              label="Base"
              value={base}
              onChangeText={setBase}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Período Inicial"
              value={periodoInicial}
              onChangeText={setPeriodoInicial}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Período Final"
              value={periodoFinal}
              onChangeText={setPeriodoFinal}
              mode="outlined"
              style={styles.input}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Número do Voo"
              value={numeroVoo}
              onChangeText={setNumeroVoo}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Tipo"
              value={tipo}
              onChangeText={setTipo}
              mode="outlined"
              style={styles.input}
            />
            <View style={styles.input} />
          </View>

          <TextInput
            label="Localizador (PNR)"
            value={localizadorPNR}
            onChangeText={setLocalizadorPNR}
            mode="outlined"
            style={styles.pnrInput}
          />

          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={handleFiltrar}
              buttonColor="#ccc"
              textColor="#333"
              style={styles.button}
            >
              Filtrar
            </Button>

            <Button
              mode="contained"
              onPress={handleExportarCSV}
              buttonColor="#ccc"
              textColor="#333"
              style={styles.button}
            >
              Exportar CSV
            </Button>
          </View>

          <View style={styles.resultsArea}>
            <Text style={styles.resultsText}>Área de Resultados (Tabela/Lista)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FF6600',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    width: '32%',
  },
  pnrInput: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    width: 150,
  },
  resultsArea: {
    minHeight: 300,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  resultsText: {
    color: '#666',
  },
});

export default RelatoriosScreen;
