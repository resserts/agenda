import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TextInput,
     TouchableOpacity
} from 'react-native'
import TarefasDia from './TarefasDia'

export default class CriarTarefa extends React.Component {
     state = {
          titulo:'',
          data:new Date(),
          status: 0,
          descricao: ''
     }
     onChangeText = (key, value) => {
          this.setState({ [key]: value })
     }
     submit = () => {
          if(this.state.titulo === ''){
               alert('Por favor insira um titulo')
               return
          }
          if(this.state.data === ''){
               alert('Por favor insira uma data')
               return
          }
          const tarefa = {
               titulo: this.state.titulo,
               data: this.state.data,
               status: this.state.status,
               descricao: this.state.descricao
          }
          this.props.criarTarefa(tarefa)
          this.setState({
               titulo:'',
               data:new Date(),
               status: 0,
               descricao: ''
          })
          this.props.navigation.navigate('Tarefas dia', {TarefasDia})
     }
     render(){
          return (
               <View style={styles.container}>
               <TextInput
               placeholder='Titulo'
               onChangeText={val => this.onChangeText('titulo', val)}
               style={styles.input}
               value={this.state.nome}
               />
               <TextInput
               placeholder='Data'
               onChangeText={val => this.onChangeText('data', val)}
               style={styles.input}
               value={this.state.nome}
               />
               <TextInput
               placeholder='Descrição'
               onChangeText={val => this.onChangeText('descricao', val)}
               style={styles.input}
               value={this.state.nome}
               />
               <TouchableOpacity onPress={this.submit}>
               <View style={styles.button}>
                    <Text style={styles.buttonText}>Criar</Text>
               </View>
               </TouchableOpacity>
               </View>
          )
     }
}

const styles = StyleSheet.create({
     button: {
          height: 50,
          backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          width: 150,
          margin: 10
     },
     buttonText: {
          color: 'white',
          fontSize: 18
     },
     heading: {
          color: '#1F422F',
          fontSize: 40,
          marginBottom: 10,
          alignSelf: 'center'
     },
     container: {
          backgroundColor: '#101C30',
          flex: 1,
          justifyContent: 'center'
     },
     input: {
          margin: 10,
          backgroundColor: 'white',
          width: 300,
          alignSelf: 'center',
          height: 50
     }
})


