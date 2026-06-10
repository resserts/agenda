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



     export default class TarefasDia extends React.Component {
          tarefasDiaButton = () => {
               this.props.navigation.navigate("Tarefas dia", TarefasDia)
          }
          alterarStatusButton = (tarefa) => {
               // 1. Inverte o status da tarefa em memória
               tarefa.status = !tarefa.status;

               // 2. Força o React Navigation a re-renderizar a tela atual
               this.props.navigation.setParams({ refresh: Math.random() });

               // 3. Garante que a navegação continue estável nesta tela
               this.props.navigation.navigate("Tarefas todas");
          }
          render(){
               const perfis = this.props.perfis

               return (
                    <ScrollView style={{backgroundColor: '#101010'}} contentContainerStyle={[!perfis.length && {flex: 1, backgroundColor: '#202020'}]}>
                         <View style={[!perfis.length && { justifyContent: 'center', flex: 1 , backgroundColor: '#101010'}]}>
                         {
                              !perfis.length && <Text style={styles.text}>Não há nenhum perfil criado</Text>
                         }
                         {
                              perfis.map((item, index) => (
                                   
                                   <View style={styles.perfilContainer} key={index}>
                                        {!item.getTarefas().length && <Text style={styles.tarefa}>Nenhuma tarefa salva</Text>}
                                        {
                                             item.getTarefas().map((tarefa) => (
                                                 /* CORRIGIDO: key única usando o ID universal da tarefa */
                                                 <View style={styles.tarefaContainer} key={tarefa.getId()}>
                                                      <Text style={styles.tarefa}>{tarefa.titulo}</Text>
                                                      <Text style={styles.tarefa}>{tarefa.data.toDateString()}</Text>
                                                      <Text style={styles.tarefa}>{tarefa.descricao}</Text>

                                                      {/* BOTÃO INTERATIVO DE STATUS */}
                                                      <TouchableOpacity
                                                          style={{alignSelf: 'flex-end', width: '40%'}}
                                                          onPress={() => this.alterarStatusButton(tarefa)}
                                                      >
                                                           <View style={[styles.button, {marginVertical: 5, width: '100%'}, tarefa.status && {backgroundColor: '#22c55e'}]}>
                                                                <Text style={styles.buttonText}>{tarefa.status ? '✅ Concluída' : '🟩 Pendente'}</Text>
                                                           </View>
                                                      </TouchableOpacity>
                                                 </View>
                                             ))
                                        }
                                   </View>
                         ))
                    }
                    </View>
                    <TouchableOpacity onPress={this.tarefasDiaButton}>
                    <View style={styles.button}>
                         <Text style={styles.buttonText}>Tarefas do dia</Text>
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
     perfilContainer: {
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
          flexDirection: 'row',
          overflow: 'scroll'
          
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

