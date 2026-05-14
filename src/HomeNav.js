import { createStackNavigator } from '@react-navigation/stack'
import TarefasDia from './TarefasDia'
import TarefasTodas from './TarefasTodas'
import CriarTarefa from './CriarTarefa'
import CriarPerfil from './CriarPerfil'

const HomeNav = createStackNavigator()

const HomeNavScreen = ({perfis, selecionado, dia, criarPerfil, selecionarPerfil, selecionarDia, getPerfil}) => (
     <HomeNav.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
     }}>
          <HomeNav.Screen name="Tarefas dia">
               {(props) => <TarefasDia {...props} perfis={perfis} selecionado={selecionado} dia={dia} selecionarPerfil={selecionarPerfil} selecionarDia={selecionarDia} />}
          </HomeNav.Screen>
          <HomeNav.Screen name="Tarefas todas">
               {(props) => <TarefasTodas {...props} perfis={perfis}/>}
          </HomeNav.Screen>
          <HomeNav.Screen name="Criar tarefa">
               {(props) => <CriarTarefa {...props} getPerfil={getPerfil}/>}
          </HomeNav.Screen>
          <HomeNav.Screen name="Criar perfil">
               {(props) => <CriarPerfil {...props} criarPerfil={criarPerfil}/>}
          </HomeNav.Screen>
          
     </HomeNav.Navigator>
);

export default HomeNavScreen
