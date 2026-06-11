import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavScreen from './src/HomeNav';

const Tab = createBottomTabNavigator()

export default class App extends Component {
     state = {
          perfis: [],
          selecionado: -1,
          dia: new Date()
     }

     getPerfil = () => {
          if (this.state.selecionado < 0 || !this.state.perfis[this.state.selecionado]) {
               return null;
          }
          return this.state.perfis[this.state.selecionado]
     }

     criarPerfil = (perfil) => {
          this.setState(prevState => {
               const novosPerfis = [...prevState.perfis, perfil];
               return {
                    perfis: novosPerfis,
                    selecionado: novosPerfis.length - 1
               };
          });
     }

     selecionarPerfil = (index) => {
          const idx = Number(index);
          if (idx >= -1 && idx < this.state.perfis.length) {
               this.setState({ selecionado: idx });
          }
     }

     selecionarDia = (dia) => {
          if (dia instanceof Date && !isNaN(dia)) {
               this.setState({ dia: dia });
          }
     }

     render(){
          return (
              <NavigationContainer>
                   <Tab.Navigator screenOptions= {{
                        headerShown: false,
                        tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155' },
                        tabBarActiveTintColor: '#6366f1',
                        tabBarInactiveTintColor: '#94a3b8'
                   }}>
                        <Tab.Screen name='Tarefas dia'>
                             {props => <HomeNavScreen {...props}
                                                      perfis={this.state.perfis}
                                                      selecionado={this.state.selecionado}
                                                      dia={this.state.dia}
                                                      addPerfil={this.criarPerfil}
                                                      selecionarPerfil={this.selecionarPerfil}
                                                      selecionarDia={this.selecionarDia}
                                                      getPerfil={this.getPerfil}/>}
                        </Tab.Screen>
                   </Tab.Navigator>
              </NavigationContainer>
          );
     }
}