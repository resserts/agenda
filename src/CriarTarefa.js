import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TextInput,
     TouchableOpacity
} from 'react-native'
import DatePicker from 'react-datepicker'
import TarefasDia from './TarefasDia'
import { Tarefa } from './Tarefa'
import { Perfil } from './Perfil'

export default class CriarTarefa extends React.Component {
     state = {
          titulo:'',
          data:new Date(),
          status: false,
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
          var perfil = this.props.getPerfil()
          perfil.addTarefa(new Tarefa(this.state.titulo, this.state.descricao, this.state.data))
          this.setState({
               titulo:'',
               data:new Date(),
               status: false,
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
               value={this.state.titulo}
               />
               <DatePicker
               selected={this.state.data}
               onChange={(date) => {this.state.data=date}}
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
// ... (imports permanecem iguais)
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
          width: '100%',
          justifyContent: 'center' // Para o DatePicker parecer um input
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
/*const styles = StyleSheet.create({
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
})*/


