export class Tarefa {
    constructor(titulo, descricao, data) {
        this.id = Math.random().toString(36).substr(2, 9) + Date.now(); // ID único universal
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.status = false;
    }
    getId() {
        return this.id;
    }
    getTitulo() {
        return this.titulo;
    }
    getDescricao() {
        return this.descricao;
    }
    getData() {
        return this.data;
    }
    getStatus() {
        return this.status;
    }
}