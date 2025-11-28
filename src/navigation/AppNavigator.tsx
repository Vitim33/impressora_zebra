import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

// Importação das telas
import RelatoriosScreen from '../screens/RelatoriosScreen';
import CadastroFornecedoresScreen from '../screens/CadastroFornecedoresScreen';
import PromocodeScreen from '../screens/PromocodeScreen';
import HoteisScreen from '../screens/HoteisScreen';
import AlimentacaoScreen from '../screens/AlimentacaoScreen';
import TransporteScreen from '../screens/TransporteScreen';
import AutorizacaoVouchersScreen from '../screens/AutorizacaoVouchersScreen';
import EmitirVouchersScreen from '../screens/EmitirVouchersScreen';
import CancelarVouchersScreen from '../screens/CancelarVouchersScreen';

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Relatórios"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF6600', // Cor laranja da GOL
          },
          headerTintColor: '#fff',
          drawerActiveBackgroundColor: '#FF6600',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
        }}
      >
        <Drawer.Screen
          name="Cadastro de fornecedores"
          component={CadastroFornecedoresScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="user-plus" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Promocode"
          component={PromocodeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="tag" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Hotéis"
          component={HoteisScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="hotel" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Alimentação"
          component={AlimentacaoScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="utensils" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Transporte"
          component={TransporteScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="car" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Autorização de Vouchers"
          component={AutorizacaoVouchersScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="check-circle" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Emitir Vouchers"
          component={EmitirVouchersScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="ticket-alt" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Cancelar Vouchers"
          component={CancelarVouchersScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="times-circle" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Relatórios"
          component={RelatoriosScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="chart-bar" type="font-awesome-5" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
