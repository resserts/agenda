import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TextInput,
     TouchableOpacity
} from 'react-native'
import { Perfil } from './Perfil'
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

          var perfil = new Perfil(this.state.nome)
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
          alignSelf: 'center'
     },
     button: {
          height: 55,
          backgroundColor: '#6366f1',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          width: '100%',
          marginTop: 10,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25
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


