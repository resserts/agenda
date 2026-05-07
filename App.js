import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavScreen from './src/HomeNav';
import { Perfil } from './src/Perfil';
import Tarefa from './src/Tarefa';

const Tab = createBottomTabNavigator()

export default class App extends Component {
     state = {
          perfis: [],
          selecionado: -1,
          dia: new Date()
     }

     getPerfil = () => {
          return this.state.perfis[this.state.selecionado]
     }
     criarPerfil = (perfil) => {
          const perfis = this.state.perfis
          perfis.push(perfil)
          this.setState({perfis: perfis,
                         selecionado: perfis.length-1,
                         dia: this.state.dia})
     }
     criarTarefa = (titulo, descricao, data) => {
          const perfis = this.state.perfis
          perfis[this.state.selecionado].addTarefa(new Tarefa(titulo, descricao, data))
          this.setState({perfis})
     }

     render(){
          console.log(this.state)

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
                                   criarPerfil={this.criarPerfil}
                                   criarTarefa={this.criarTarefa}
                                   getPerfil={this.getPerfil}/>}
                         </Tab.Screen>
                    </Tab.Navigator>
               </NavigationContainer>

          );
     }
}

