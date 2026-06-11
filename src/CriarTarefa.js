import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TextInput,
     TouchableOpacity
} from 'react-native'
import DatePicker from 'react-datepicker'
import { Tarefa } from './Tarefa'

export default class CriarTarefa extends React.Component {
     state = {
          titulo: '',
          data: new Date(),
          status: false,
          descricao: '',
          modoEdicao: false,
          tarefaOriginal: null
     }

     // Executa assim que a tela abre: verifica se veio alguma tarefa para editar
     componentDidMount() {
          const params = this.props.route?.params;
          if (params && params.tarefaParaEditar) {
               const t = params.tarefaParaEditar;
               this.setState({
                    titulo: t.getTitulo(),
                    data: t.getData(),
                    status: t.getStatus(),
                    descricao: t.getDescricao(),
                    modoEdicao: true,
                    tarefaOriginal: t // Guarda a referência física do objeto para atualizá-lo
               });
          }
     }

     onChangeText = (key, value) => {
          this.setState({ [key]: value })
     }

     onChangeDate = (date) => {
          this.setState({ data: date })
     }

     submit = () => {
          if (this.state.titulo === '') {
               alert('Por favor insira um titulo')
               return
          }
          if (this.state.data === '') {
               alert('Por favor insira uma data')
               return
          }

          if (this.state.modoEdicao) {
               // MODO EDIÇÃO: Atualiza os dados diretamente no objeto que está na lista
               const t = this.state.tarefaOriginal;
               t.titulo = this.state.titulo;
               t.descricao = this.state.descricao;
               t.data = this.state.data;
          } else {
               // MODO CRIAÇÃO: Cria uma nova instância de Tarefa normalmente
               var perfil = this.props.getPerfil()
               perfil.addTarefa(new Tarefa(this.state.titulo, this.state.descricao, this.state.data))
          }

          // Limpa e reseta o estado interno do componente
          this.setState({
               titulo: '',
               data: new Date(),
               status: false,
               descricao: '',
               modoEdicao: false,
               tarefaOriginal: null
          })

          // Força a atualização do React Navigation para redesenhar as telas com os novos dados
          this.props.navigation.setParams({ refresh: Math.random() });
          this.props.navigation.navigate('Tarefas dia')
     }

     render() {
          return (
              <View style={styles.container}>
                   <TextInput
                       placeholder='Titulo'
                       onChangeText={val => this.onChangeText('titulo', val)}
                       style={styles.input}
                       value={this.state.titulo}
                       placeholderTextColor="#64748b"
                   />

                   <View style={styles.datePickerContainer}>
                        <DatePicker
                            selected={this.state.data}
                            onChange={this.onChangeDate}
                            dateFormat="dd/MM/yyyy"
                        />
                   </View>

                   <TextInput
                       placeholder='Descrição'
                       onChangeText={val => this.onChangeText('descricao', val)}
                       style={styles.input}
                       value={this.state.descricao}
                       placeholderTextColor="#64748b"
                   />

                   <TouchableOpacity onPress={this.submit}>
                        <View style={styles.button}>
                             <Text style={styles.buttonText}>
                                  {this.state.modoEdicao ? 'Salvar Alterações' : 'Criar'}
                             </Text>
                        </View>
                   </TouchableOpacity>
              </View>
          )
     }
}

const styles = StyleSheet.create({
     container: {
          backgroundColor: '#0f172a',
          flex: 1,
          justifyContent: 'center',
          padding: 20
     },
     input: {
          height: 55,
          backgroundColor: '#1e293b',
          borderRadius: 12,
          paddingHorizontal: 15,
          color: 'white',
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#334155',
          marginBottom: 15,
          width: '100%'
     },
     datePickerContainer: {
          height: 55,
          backgroundColor: '#1e293b',
          borderRadius: 12,
          justifyContent: 'center',
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: '#334155',
          marginBottom: 15,
          width: '100%'
     },
     button: {
          height: 55,
          backgroundColor: '#6366f1',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          marginTop: 10
     },
     buttonText: {
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold'
     }
})