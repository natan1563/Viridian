const { createApp } = Vue

createApp({
  data() {
    return {
        novaTarefa:'',
        tarefas: ['Maçã','Aucerola','Preda']

    }
  },
  methods:{

    inserirTarefa(){
      if (this.novaTarefa.length == 0) {
        alert('Campo vazio')

      }else {

        if (this.tarefas.indexOf(this.novaTarefa) !==-1) {
          alert('informação repetida')
        } else{

          this.tarefas.push(this.novaTarefa);
          this.novaTarefa =''
          
        }         
      }
      
    },
    limparLista(){
      this.tarefas =[]
    },


  },
 
}).mount('#app')
