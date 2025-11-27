import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
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
  botao: {
    marginTop: 20,
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  botaoTxt: {
    color: '#fff',
    fontSize: 18,
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
