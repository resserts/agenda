import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TextInput,
     TouchableOpacity
} from 'react-native'
import TarefasDia from './TarefasDia'

export default class CriarPerfil extends React.Component {
     state = {
          nome:''
     }
     onChangeText = (key, value) => {
          this.setState({ [key]: value })
     }
     submit = () => {
          if(this.state.nome === ''){
               alert('Por favor insira um nome')
               return
          }
          const perfil = {
               titulo: this.state.nome,
               tarefas: []
          }
          this.props.criarPerfil(perfil)
          this.setState({
               nome:''
          })
          this.props.navigation.navigate('Tarefas dia', {TarefasDia})
     }
     render(){
          return (
               <View style={styles.container}>
               <TextInput
               placeholder='Nome'
               onChangeText={val => this.onChangeText('nome', val)}
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


