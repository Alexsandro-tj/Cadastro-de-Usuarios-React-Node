import { useEffect, useState, useRef } from 'react' /*Importanção do useEffect é usado para poder renderizar os dados em tempo real no nosso React, sem ele não podemos fazer mudanças em real time.  IMPORTAÇÃO useState, ele é usado para mudar o estado dos nossos atributos, sendo usando para mudar os dados de variaveis, comumente usado na construção de Apis. IMPORTAÇÃO useRef, ele é usado para podermos pegar os dados dos nossos imputs em real time e depois armazenarmos em variaveis */
import './style.css'
import Trash from '../../src/assets/trash.svg'
import api from '../../src/services/api'


function Home() {
  // declaração de variavel dentro dos conchetes vai a variavel que vamos utilizar em nosso código, despois da virgula usamos essa outra variavel para podermos mudar a primeira variavel dos cochetes. Elas vão receber o métdo useState, com o parametro de um array vazio, indicando o estado atual, e depois vai ser chamado e mudado ao longo de nossa aplicação.
  const [users, setUsers] = useState([])
  const inputName = useRef()  // Mapeando os valores inseridos em nossos imputs
  const inputAge = useRef()   // Mapeando os valores inseridos em nossos imputs
  const inputemail = useRef() // Mapeando os valores inseridos em nossos imputs

  //função asyncrona, pois vamos esperar resultados que vem do nosso banco de dados. Está é uma função que pega os nossos usuarios de nossa Api (back end). Dentro dessa função, foi delcarada uma variavel que vai receber uma rota do nosso back end, que vamos acessar o nosso express por meio do método get, onde ira ter como parametro a nossa rota que vamos pegar os dados, esses dados foram setados lá no back end. Depois usamos o nosso setUsers, usando nossa variavel que recebe a rota do back end no argumento concatenando o data. Na linha 37 a 39 temos o chamamento dessa função e sendo renderizada em tela para o usuario.
  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)

  }

  //Função asyncrona  de criação de usuarios, onde iremos usar o express, e usar o método post, na rota que vamos usar para preencher os campos de imput dos usuarios. E dentro desse mesmo campo de argumento, vamos passar no mesmo formato que foi declarado lá no back end, usando os mesmos nomes dos nossos campos que temos lá no nosso index.jsx (html). Dentro da função, usamos o método getUsers para atualizar a nossa lista para o usuario.
  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputemail.current.value,
      age: inputAge.current.value
    })
    getUsers()
  }
// Função asyncrona, para podemos deletar os usuarios onde se tem como argumento o nome da parametro que precisamos para deletar o usuarios na nossa rota. A deleção é feita por meio da URL com o numero de 'id' unico do usuario. E depois Pegamos e atualizamos a nossa lista automaticamente.
  async function deleteUsers(id) {
    await api.delete(`/usuarios${id}`)

    getUsers()
  }

// Método para renderização em tempo real da nossa Api, na tela para o usuario.
  useEffect(() => {
    getUsers()
  }, [])

  // Abaixo do return fica o nosso 'html'
  return (
    <div className='container'>

      <form action="">
        <h1>Cadastro de Usuarios</h1>
        <input placeholder='Nome' name='nome' type="text" ref={inputName} />
        <input placeholder='E-mail' name='email' type="email" ref={inputemail} />
        <input placeholder='Idade' name='idade' type="number" ref={inputAge} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div className='card' key={user.id}>
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Idade: <span>{user.age}</span></p>
          </div>
          <button onClick={() => deleteUsers(user._id)}>
            <img src={Trash} />
          </button>
        </div>

      ))}


    </div>

  )
}

export default Home
