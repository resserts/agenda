import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TouchableOpacity,
     ScrollView
} from 'react-native'
import DatePicker from 'react-datepicker'
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
     selecionarPerfilButton = (selecionar) => {
          this.props.selecionarPerfil(Number(selecionar))
          this.forceUpdate()
     }
     selecionarDiaButton = (dia) => {
          this.props.selecionarDia(dia)
          this.forceUpdate()
     }
     alterarStatusButton = (tarefa) => {
          tarefa.status = !tarefa.status
          this.forceUpdate()
     }
     excluirTarefaButton = (tarefa) => {
          const perfis = this.props.perfis
          const selecionado = this.props.selecionado
          const perfil = perfis[selecionado]
          perfil.tarefas = perfil.getTarefas().filter(t => t.getId() !== tarefa.getId())
          this.forceUpdate()
     }
     excluirPerfilButton = (perfilExcluir) => {
          const perfis = this.props.perfis
          const idx = perfis.indexOf(perfilExcluir)
          if(idx > -1) {
               perfis.splice(idx, 1)
               this.props.selecionarPerfil(perfis.length - 1)
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
          const selecionado = this.props.selecionado
          const dia = this.props.dia
          if(selecionado<0 || !perfis.length){
               return (
                   <View style={styles.container}>
                        <TouchableOpacity onPress={this.criarPerfilButton}>
                             <View style={styles.button}>
                                  <Text style={styles.buttonText}>Criar Perfil</Text>
                             </View>
                        </TouchableOpacity>
                   </View>
               )
          }

          const tarefas = perfis[selecionado].getTarefas().filter(tarefa => tarefa.data.toDateString() === dia.toDateString()).sort((a, b) => a.data.getTime() - b.data.getTime())
          return (
              <ScrollView style={{backgroundColor: '#101010'}} contentContainerStyle={[!tarefas.length && {flex: 1, backgroundColor: '#202020'}]}>
                   <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '90%', alignSelf: 'center', marginTop: 10}}>
                        <TouchableOpacity onPress={() => this.editarPerfilButton(perfis[selecionado])} style={{flex: 1, marginRight: 5}}>
                             <View style={[styles.statusButton, {backgroundColor: '#eab308', height: 40}]}>
                                  <Text style={styles.buttonText}>✏️ Editar Perfil Atual</Text>
                             </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.excluirPerfilButton(perfis[selecionado])} style={{flex: 1, marginLeft: 5}}>
                             <View style={[styles.statusButton, {backgroundColor: '#ef4444', height: 40}]}>
                                  <Text style={styles.buttonText}>❌ Remover Perfil Atual</Text>
                             </View>
                        </TouchableOpacity>
                   </View>

                   <TouchableOpacity onPress={this.criarPerfilButton} style={{marginTop: 5}}>
                        <View style={styles.button}>
                             <Text style={styles.buttonText}>Criar Novo Perfil</Text>
                        </View>
                   </TouchableOpacity>

                   <Text style={[styles.tarefa, {marginLeft: 20, marginTop: 10, fontWeight: 'bold', color: '#6366f1'}]}>Selecionar Perfil:</Text>
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10, paddingHorizontal: 15}}>
                        {
                             perfis.map((item, index) => {
                                  const estaSelecionado = index === AppNum(selecionado);
                                  return (
                                      <TouchableOpacity
                                          key={index}
                                          onPress={() => this.selecionarPerfilButton(index)}
                                          style={[
                                               { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1 },
                                               estaSelecionado
                                                   ? { backgroundColor: '#6366f1', borderColor: '#6366f1' }
                                                   : { backgroundColor: '#1e293b', borderColor: '#334155' }
                                          ]}
                                      >
                                           <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                                                {item.nome} {estaSelecionado && '👤'}
                                           </Text>
                                      </TouchableOpacity>
                                  );
                             })
                        }
                   </ScrollView>

                   <View style={styles.button}>
                        <DatePicker
                            selected={dia}
                            onChange={(date) => { this.selecionarDiaButton(date)}}
                        />
                   </View>
                   <View style={[!tarefas.length && { justifyContent: 'center', flex: 1 , backgroundColor: '#101010'}]}>
                        {
                            !tarefas.length && <Text style={styles.text}>Não há nenhuma tarefa salva</Text>
                        }
                        {
                             tarefas.map((item) => (
                                 <View style={styles.tarefaContainer} key={item.getId()}>
                                      <TouchableOpacity
                                          onPress={() => this.props.navigation.navigate("Criar tarefa", { tarefaParaEditar: item })}
                                          style={{ flex: 1 }}
                                      >
                                           <Text style={[styles.tarefa, { fontWeight: 'bold', color: '#818cf8' }]}>{item.titulo} ✏️</Text>
                                           <Text style={styles.tarefa}>{item.data.toDateString()}</Text>
                                           <Text style={[styles.tarefa, { color: '#94a3b8', fontSize: 14 }]}>{item.descricao}</Text>
                                      </TouchableOpacity>

                                      <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 10}}>
                                           <TouchableOpacity onPress={() => this.excluirTarefaButton(item)}>
                                                <View style={[styles.statusButton, {backgroundColor: '#ef4444'}]}>
                                                     <Text style={styles.buttonText}>❌ Excluir</Text>
                                                </View>
                                           </TouchableOpacity>
                                           <TouchableOpacity onPress={() => this.alterarStatusButton(item)}>
                                                <View style={[styles.statusButton, item.status && {backgroundColor: '#22c55e'}]}>
                                                     <Text style={styles.buttonText}>{item.status ? '✅ Concluída' : '🟩 Pendente'}</Text>
                                                </View>
                                           </TouchableOpacity>
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

const AppNum = (val) => Number(val);

const styles = StyleSheet.create({
     container: {
          backgroundColor: '#101010',
          flex: 1,
          justifyContent: 'center'
     },
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
          borderRadius: 12,
          flexDirection: 'row'
     },
     buttonText: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'center'
     },
     tarefaContainer: {
          padding: 16,
          backgroundColor: '#1e293b',
          borderRadius: 16,
          marginHorizontal: 20,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#334155',
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