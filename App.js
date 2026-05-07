import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavScreen from './src/HomeNav';

const Tab = createBottomTabNavigator()

class Perfil{
     constructor(nome){
          this.nome=nome;
          this.tarefas=[];
     }
}
export default class App extends Component {
     state = {
          perfis: [],
          selecionado: -1,
          dia: new Date()
     }

     criarPerfil = (perfil) => {
          const perfis = this.state.perfis
          perfis.push(perfil)
          this.setState({perfis: perfis,
                         selecionado: perfis.length-1,
                         dia: this.state.dia})
     }
     criarTarefa = (tarefa) => {
          const perfis = this.state.perfis
          perfis[this.state.selecionado].tarefas.push(tarefa)
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
                                   criarTarefa={this.criarTarefa}/>}
                         </Tab.Screen>
                    </Tab.Navigator>
               </NavigationContainer>

          );
     }
}

