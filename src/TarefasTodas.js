import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TouchableOpacity,
     ScrollView
} from 'react-native'
import TarefasDia from './TarefasDia'

export default class TarefasTodas extends React.Component {
     tarefasDiaButton = () => {
          this.props.navigation.navigate("Tarefas dia", TarefasDia)
     }
     alterarStatusButton = (tarefa) => {
          tarefa.status = !tarefa.status
          this.forceUpdate()
     }
     excluirTarefaButton = (perfil, tarefa) => {
          perfil.tarefas = perfil.getTarefas().filter(t => t.getId() !== tarefa.getId())
          this.forceUpdate()
     }
     excluirPerfilButton = (perfilExcluir) => {
          const perfis = this.props.perfis
          const idx = perfis.indexOf(perfilExcluir)
          if(idx > -1) {
               perfis.splice(idx, 1)
               if(this.props.selecionado >= perfis.length) {
                    this.props.selecionarPerfil(perfis.length - 1)
               }
          }
          this.forceUpdate()
     }
     editarPerfilButton = (perfil) => {
          const novoNome = prompt("Digite o novo nome do perfil:", perfil.nome)
          if(novoNome && novoNome.trim() !== "") {
               perfil.nome = novoNome.trim()
               this.forceUpdate()
          }
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
                                 <View style={styles.perfilOuterContainer} key={index}>
                                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, width: '100%'}}>
                                           <Text style={{color: '#6366f1', fontSize: 18, fontWeight: 'bold'}}>{item.nome}</Text>
                                           <View style={{flexDirection: 'row', marginLeft: 'auto', gap: 5}}>
                                                <TouchableOpacity onPress={() => this.editarPerfilButton(item)}>
                                                     <View style={{backgroundColor: '#eab308', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8}}>
                                                          <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>Editar</Text>
                                                     </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.excluirPerfilButton(item)}>
                                                     <View style={{backgroundColor: '#ef4444', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8}}>
                                                          <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>Remover</Text>
                                                     </View>
                                                </TouchableOpacity>
                                           </View>
                                      </View>

                                      <View style={styles.perfilContainer}>
                                           {!item.getTarefas().length && <Text style={styles.tarefa}>Nenhuma tarefa salva</Text>}
                                           {
                                                item.getTarefas().map((tarefa) => (
                                                    <View style={styles.tarefaContainer} key={tarefa.getId()}>
                                                         <TouchableOpacity
                                                             onPress={() => this.props.navigation.navigate("Criar tarefa", { tarefaParaEditar: tarefa })}
                                                             style={{ flex: 1 }}
                                                         >
                                                              <Text style={[styles.tarefa, { fontWeight: 'bold', color: '#818cf8' }]}>{tarefa.titulo} ✏️</Text>
                                                              <Text style={styles.tarefa}>{tarefa.data.toDateString()}</Text>
                                                              <Text style={[styles.tarefa, { color: '#94a3b8', fontSize: 14 }]}>{tarefa.descricao}</Text>
                                                         </TouchableOpacity>

                                                         <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 10}}>
                                                              <TouchableOpacity onPress={() => this.excluirTarefaButton(item, tarefa)}>
                                                                   <View style={[styles.statusButton, {backgroundColor: '#ef4444'}]}>
                                                                        <Text style={styles.buttonText}>❌ Excluir</Text>
                                                                   </View>
                                                              </TouchableOpacity>
                                                              <TouchableOpacity onPress={() => this.alterarStatusButton(tarefa)}>
                                                                   <View style={[styles.statusButton, tarefa.status && {backgroundColor: '#22c55e'}]}>
                                                                        <Text style={styles.buttonText}>{tarefa.status ? '✅ Concluída' : '🟩 Pendente'}</Text>
                                                                   </View>
                                                              </TouchableOpacity>
                                                         </View>
                                                    </View>
                                                ))
                                           }
                                      </View>
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
     statusButton: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: '#6366f1',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12
     },
     buttonText: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'center'
     },
     perfilOuterContainer: {
          backgroundColor: '#1e293b',
          borderRadius: 16,
          marginHorizontal: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#334155',
          paddingBottom: 10
     },
     perfilContainer: {
          padding: 16,
          overflow: 'scroll'
     },
     tarefaContainer: {
          padding: 16,
          backgroundColor: '#0f172a',
          borderRadius: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#334155',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          width: '100%'
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