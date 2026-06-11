import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TextInput,
     TouchableOpacity
} from 'react-native'
import { Perfil } from './Perfil'

export default class CriarPerfil extends React.Component {
     state = {
          nome: ''
     }
     onChangeText = (key, value) => {
          this.setState({ [key]: value })
     }
     submit = () => {
          if(this.state.nome === ''){
               alert('Por favor insira um nome')
               return
          }

          const novoPerfil = new Perfil(this.state.nome)
          this.props.addPerfil(novoPerfil)

          this.setState({
               nome: ''
          })
          this.props.navigation.navigate('Tarefas dia')
     }
     render(){
          return (
              <View style={styles.container}>
                   <TextInput
                       placeholder='Nome'
                       onChangeText={val => this.onChangeText('nome', val)}
                       style={styles.input}
                       value={this.state.nome}
                       placeholderTextColor="#64748b"
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