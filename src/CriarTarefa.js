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
          descricao: ''
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

          var perfil = this.props.getPerfil()
          perfil.addTarefa(new Tarefa(this.state.titulo, this.state.descricao, this.state.data))

          this.setState({
               titulo: '',
               data: new Date(),
               status: false,
               descricao: ''
          })

          // Volta de forma limpa para a tela anterior
          this.props.navigation.navigate('RefazendoNavegacao', { screen: 'Tarefas dia' })
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