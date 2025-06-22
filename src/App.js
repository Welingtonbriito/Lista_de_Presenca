import { useState, useEffect } from 'react'
import { db } from './firebaseConnection';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot} from 'firebase/firestore'

import './App.css';

function App() {
  const [aluno, setAluno] = useState('');
  const [turma, setTurma] = useState('');
  const [idPost, setIdPost] = useState('')

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts(){
      const unsub = onSnapshot(collection(db, "alunos"), (snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            aluno: doc.data().aluno,
            turma: doc.data().turma,
          })
        })
  
        setPosts(listaPost);
      })
    }

    loadPosts();

  }, [])

  async function handleAdd(){
    await addDoc(collection(db, "alunos"), {
      aluno: aluno,
      turma: turma,
    })
    .then(() => {
      console.log("ALUNO(A) REGISTRADO COM SUCESSO")
      setTurma('');
      setAluno('')
    })
    .catch((error) => {
      console.log("ERRO " + error)
    })}

  async function buscarPost(){
    const postsRef = collection(db, "alunos")
    await getDocs(postsRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          aluno: doc.data().aluno,
          turma: doc.data().turma,
        })
      })

      setPosts(lista);
    })
    .catch((error) => {
      console.log("ERRO AO BUSCAR ALUNO")
    })}

  async function editarPost(){
    const docRef = doc(db, "alunos", idPost)
    
    await updateDoc(docRef, {
      aluno: aluno,
      turma: turma
    })
    .then(() => {
      console.log("ALUNO ATUALIZADO!")
      setIdPost('')
      setAluno('')
      setTurma('')
    })
    .catch((error) => {
      console.log(error)
    })}

  async function excluirPost(id){
    const docRef = doc(db, "alunos", id)
    await deleteDoc(docRef)
    .then(() =>{
      alert("ALUNO(A) DELETADO DA LISTA DE PRESENÇA!")
    })}

  return (
    <div>
      <h1>LISTA DE PRESENÇA</h1>

    <div className="container">
      <label>ID do Aluno:</label>
      <input
        placeholder='Digite o ID do Aluno(a)'
        value={idPost}
        onChange={ (e) => setIdPost(e.target.value) }
      /> <br/>

      <label>Aluno:</label>
      <textarea
        type="text"
        placeholder='Digite o nome do aluno(a)'
        value={aluno}
        onChange={ (e) => setAluno(e.target.value) }
      />

      <label>Turma:</label>
      <input
        type="text" 
        placeholder="Turma do aluno(a)"
        value={turma}
        onChange={(e) => setTurma(e.target.value) }
      />

      <button onClick={handleAdd}>Registrar</button><br/>
      <button onClick={buscarPost}>Buscar Aluno</button> <br/>

      <button onClick={editarPost}>Editar Aluno</button>


      <ul>
        {posts.map( (post) => {
          return(
            <li key={post.id}>
              <strong>ID: {post.id}</strong> <br/>
              <span>Aluno: {post.aluno} </span> <br/>
              <span>Turma: {post.turma}</span> <br/> 
              <button onClick={ () => excluirPost(post.id) }>Excluir</button> <br/> <br/>
            </li>
          )
        })}
      </ul>

    </div>

    </div>
  );
}
export default App;
