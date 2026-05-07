export class Tarefa{
    constructor(titulo, descricao, data){
        this.titulo = titulo
        this.descricao = descricao
        this.data = data
        this.status = false
    }
    getTitulo(){
        return this.titulo
    }
    getDescricao(){
        return this.descricao
    }
    getData(){
        return this.data
    }
    getStatus(){
        return this.status
    }
}