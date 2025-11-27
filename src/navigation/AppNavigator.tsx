import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AlimentacaoScreen from '../screens/AlimentacaoScreen';
import AutorizacaoVouchersScreen from '../screens/AutorizacaoVouchersScreen';
import CadastroFornecedoresScreen from '../screens/CadastroFornecedoresScreen';
import CancelarVouchersScreen from '../screens/CancelarVouchersScreen';
import EmitirVouchersScreen from '../screens/EmitirVouchersScreen';
import HoteisScreen from '../screens/HoteisScreen';
import PromocodeScreen from '../screens/PromocodeScreen';
import RelatoriosScreen from '../screens/RelatoriosScreen';
import TransporteScreen from '../screens/TransporteScreen';

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Relatórios"
        screenOptions={{
          headerStyle: { backgroundColor: '#FF6600' },
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
            drawerIcon: ({ color, size }) => <Icon name="user-plus" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Promocode"
          component={PromocodeScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="tag" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Hotéis"
          component={HoteisScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="hotel" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Alimentação"
          component={AlimentacaoScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="utensils" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Transporte"
          component={TransporteScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="car" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Autorização de Vouchers"
          component={AutorizacaoVouchersScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="check-circle" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Emitir Vouchers"
          component={EmitirVouchersScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="ticket-alt" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Cancelar Vouchers"
          component={CancelarVouchersScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="times-circle" color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="Relatórios"
          component={RelatoriosScreen}
          options={{
            drawerIcon: ({ color, size }) => <Icon name="chart-bar" color={color} size={size} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
