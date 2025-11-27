import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RelatoriosScreen: React.FC = () => {
  const [base, setBase] = useState('');
  const [periodoInicial, setPeriodoInicial] = useState('');
  const [periodoFinal, setPeriodoFinal] = useState('');
  const [numeroVoo, setNumeroVoo] = useState('');
  const [tipo, setTipo] = useState('');
  const [localizadorPNR, setLocalizadorPNR] = useState('');

  const handleFiltrar = () => {
    console.log('Filtrar com:', { base, periodoInicial, periodoFinal, numeroVoo, tipo, localizadorPNR });
  };

  const handleExportarCSV = () => {
    console.log('Exportar CSV com:', { base, periodoInicial, periodoFinal, numeroVoo, tipo, localizadorPNR });
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Relatórios
          </Text>
        </View>

        <View style={styles.formContainer}>

          {/* Linha 1 */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Base"
                value={base}
                onChangeText={setBase}
                right={<TextInput.Icon icon={() => <Icon name="calendar" size={18} color="#888" />} />}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Período Inicial"
                value={periodoInicial}
                onChangeText={setPeriodoInicial}
                right={<TextInput.Icon icon={() => <Icon name="calendar-alt" size={18} color="#888" />} />}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Período Final"
                value={periodoFinal}
                onChangeText={setPeriodoFinal}
                right={<TextInput.Icon icon={() => <Icon name="calendar-alt" size={18} color="#888" />} />}
              />
            </View>
          </View>

          {/* Linha 2 */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Número do Voo"
                value={numeroVoo}
                onChangeText={setNumeroVoo}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Tipo"
                value={tipo}
                onChangeText={setTipo}
              />
            </View>

            <View style={styles.inputContainer} />
          </View>

          {/* PNR */}
          <View style={styles.pnrInputContainer}>
            <TextInput
              label="Localizador (PNR)"
              value={localizadorPNR}
              onChangeText={setLocalizadorPNR}
            />
          </View>

          {/* Botões */}
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={handleFiltrar}
              style={styles.filterButton}
              textColor="#333"
            >
              Filtrar
            </Button>

            <Button
              mode="contained"
              onPress={handleExportarCSV}
              style={styles.exportButton}
              textColor="#333"
            >
              Exportar CSV
            </Button>
          </View>

          {/* Área de resultado */}
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
  inputContainer: {
    width: '32%',
  },
  pnrInputContainer: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#ccc',
    width: 150,
    borderRadius: 5,
  },
  exportButton: {
    backgroundColor: '#ccc',
    width: 150,
    borderRadius: 5,
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
