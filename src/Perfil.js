export class Perfil{
     constructor(nome){
          this.nome = nome
          this.tarefas = []
     }
     getNome(){
          return this.nome
     }
     getTarefas(){
          return this.tarefas
     }
     addTarefa(tarefa){
          this.tarefas.push(tarefa)
     }
     removeTarefa(tarefa){
          this.tarefas = this.tarefas.filter(t => t.getId() !== tarefa.getId())
     }
}