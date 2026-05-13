import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TouchableOpacity,
     ScrollView
} from 'react-native'
import CriarTarefa from './CriarTarefa'
import CriarPerfil from './CriarPerfil'
import TarefasTodas from './TarefasTodas'


     export default class TarefasDia extends React.Component {
          criarTarefaButton = () => {
               this.props.navigation.navigate("Criar tarefa", CriarTarefa)
          }
          criarPerfilButton = () => {
               this.props.navigation.navigate("Criar perfil", CriarPerfil)
          }
          tarefasTodasButton = () => {
               this.props.navigation.navigate("Tarefas todas", TarefasTodas)
          }
          render(){

               const perfis = this.props.perfis
               const selecionado = this.props.selecionado
               if(selecionado<0){
                    return (
                         <View>
                              <TouchableOpacity onPress={this.criarPerfilButton}>
                              <View style={styles.button}>
                                   <Text style={styles.buttonText}>Criar Perfil</Text>
                              </View>
                              </TouchableOpacity>
                         </View>
                    )
               }

               const tarefas = perfis[selecionado].getTarefas()
               console.log("ate aqui foi.", tarefas)
               return (
                    <ScrollView style={{backgroundColor: '#101010'}} contentContainerStyle={[!tarefas.length && {flex: 1, backgroundColor: '#202020'}]}>
                         <TouchableOpacity onPress={this.criarPerfilButton}>
                         <View style={styles.button}>
                              <Text style={styles.buttonText}>Criar Perfil</Text>
                         </View>
                         </TouchableOpacity>
                         <View style={[!tarefas.length && { justifyContent: 'center', flex: 1 , backgroundColor: '#101010'}]}>
                         {
                              !tarefas.length && <Text style={styles.text}>Não há nenhuma tarefa salva</Text>
                         }
                         {
                              tarefas.map((item, index) => (
                                   <View style={styles.tarefaContainer} key={index}>
                                   <Text style={styles.tarefa}>{item.titulo}</Text>
                                   <Text style={styles.tarefa}>{item.data.toDateString()}</Text>
                                   <Text style={styles.tarefa}>{item.descricao}</Text>
                                   <TouchableOpacity style={{alignSelf: 'flex-end'}}/>
                                   <View style={styles.button}>
                                   <Text style={styles.buttonText}>{item.status ? '✅':'🟩'}</Text>
                              </View>
                              </View>
                         ))
                    }
                    </View>
                    <TouchableOpacity onPress={this.criarTarefaButton}>
                    <View style={styles.button}>
                         <Text style={styles.buttonText}>Criar Tarefa</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.tarefasTodasButton}>
                    <View style={styles.button}>
                         <Text style={styles.buttonText}>Ver todas as tarefas</Text>
                    </View>
                    </TouchableOpacity>
               </ScrollView>
          )
     }

}
// ... (imports permanecem iguais)
const styles = StyleSheet.create({
     button: {
          height: 50,
          backgroundColor: '#6366f1',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: '90%',
          borderRadius: 12,
          marginVertical: 15
     },
     buttonText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold'
     },
     tarefaContainer: {
          padding: 16,
          backgroundColor: '#1e293b',
          borderRadius: 16,
          marginHorizontal: 20,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#334155',
          // Sombra leve
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
     },
     tarefa: {
          fontSize: 16,
          color: '#f8fafc',
          marginBottom: 4
     },
     text: {
          alignSelf: 'center',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: 18,
          marginTop: 50
     }
})
/*const styles = StyleSheet.create({
     button: {
          height: 50,
          backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: 150,
          margin: 10
     },
     buttonText: {
          color: 'white',
          fontSize: 18
     },
     tarefaContainer: {
          padding: 10,
          backgroundColor: '#202020',
          borderWidth: 2,
          borderColor: 'white'
     },
     tarefa: {
          fontSize: 20,
          color: 'white'
     },
     text: {
          alignSelf: 'center',
          textAlign: 'center',
          color: 'white',
          fontSize: 24
     }
})*/

