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
     criarTarefaButton = () => {
          this.props.navigation.navigate("Criar tarefa", CriarTarefa)
     }
     criarPerfilButton = () => {
          this.props.navigation.navigate("Criar perfil", CriarPerfil)
     }
     render(){

          if(selecionado>=0){
               const perfis = this.props.perfis
               const selecionado = this.props.selecionado
               const tarefas = perfis[selecionado].tarefas
          }

          console.log("ate aqui foi.", tarefas)
          return (
               <ScrollView style={{backgroundColor: '#101010'}} contentContainerStyle={[!tarefas.length && {flex: 1, backgroundColor: '#202020'}]}>
                    <TouchableOpacity onPress={this.criarPerfilButton}>
                    <View style={styles.button}>
                         <Text style={styles.buttonText}>Criar Perfil</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={[!tarefas.length && { justifyContent: 'center', flex: 1 , backgroundColor: '#101010'}]}>
                    {
                         !tarefas.length && <Text style={styles.text}>Não há nenhuma tarefa salva</Text>
                    }
                    {
                         tarefas.map((item, index) => (
                              <View style={styles.tarefaContainer} key={index}>
                              <Text style={styles.tarefa}>{index+1}) {item.titulo}</Text>
                              <Text style={styles.tarefa}>{item.data}</Text>
                              <Text style={styles.tarefa}>{item.descricao}</Text>
                              </View>
                         ))
                    }
                    </View>
                    <View>
                         <Text style={styles.text}>Pelo menos funciona</Text>
                    </View>
                    <TouchableOpacity onPress={this.criarTarefaButton}>
                    <View style={styles.button}>
                         <Text style={styles.buttonText}>Criar Tarefa</Text>
                    </View>
                    </TouchableOpacity>
               </ScrollView>
          )
     }

}

const styles = StyleSheet.create({
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
})

