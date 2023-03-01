import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log(props);
  return(
    <header>
        <h1><a href='/' onClick={(event)=>{
          props.onChagneMode();
          event.preventDefault();
        }}>{props.title}</a></h1>
    </header>
    )
}

function Nav(props) {
  const lis = []
  for (let i = 0; i< props.topics.length; i++) {
      let t = props.topics[i];
      lis.push(<li key={t.id}><a id={t.id} href={'/read/' + t.id} onClick = {(event)=>{
        event.preventDefault();
        props.onChagneMode(Number(event.target.id)); }}>{t.title}</a></li>)
      }
  return(
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
 
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Create(props){
  return(
    <div>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name='title' placeholder='title'/></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type="submit" value="create"></input></p>
      </form>
    </div>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <div>
      <h2>Update</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name='title' placeholder='title'
        value={title} onChange={event => {
          setTitle(event.target.value);
        }}/></p>
        <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
          setBody(event.target.body);
        }}></textarea></p>
        <p><input type="submit" value=" Update"></input></p>
      </form>
    </div>
  )
}


function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1, title:"life", body:"my life is ..."},
    {id:2, title:"age", body:"my age is already 25 ..."},
    {id:3, title:"name", body:"my name was changed ..."}
  ]);

  let content = null;
  let contextControl = null;
  if(mode === "WELCOME"){
      content = <Article title="Welcome" body="Hello, WEB" ></Article>
  }
  
  
  else if(mode === "READ"){
      let title,body = null;
      for (let i = 0; i < topics.length; i++) {
        if( topics[i].id === id ){
        title = topics[i].title;
        body = topics[i].body;
      }

      // title,body 값을 알아내는 코드

      content = <Article title={title} body={body} ></Article>
      contextControl = <><li><a href={'/Update'+id} onClick={(event)=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a>
  </li>  
  <li><input type="button" value="delete" onClick={()=>{
    const newTopics = []
    for (let i = 0; i < topics.length; i++) {
      if(topics[i].id !== id){
          newTopics.push(topics[i])
      }
      
    }
    setTopics(newTopics);
    setMode('WELCOME')
  }}></input></li> 
  </> 
      }
  }
  
  
  else if(mode==="CREATE"){
    content = <Create onCreate={(_title, _body)=>{
        const newTopic = {id:nextId, title:_title, body:_body}
        const newTopics = [...topics]
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);
    }}></Create> 
  }
  
  
  else if(mode==="UPDATE"){
    let title,body = null;
    for (let i = 0; i < topics.length; i++) {
      if( topics[i].id === id ){
      title = topics[i].title;
      body = topics[i].body;
    }}
    content = <Update title={title} body={body} 
    onUpdate = {(title,body)=>{ 
      const UpdatedTopic = { id:id, title:title, body:body}
      const newTopics = [...topics]
      for (let i = 0; i < topics.length; i++) {
        if( newTopics[i].id === id // # 현재 입력한 아이디
        ){
          newTopics[i] = UpdatedTopic;
          break;
        }
      }
      setTopics(newTopics); 
      setMode('READ');

    }}></Update>
  }

  return (
    <div>
      <Header title="minji" onChagneMode={()=>{
        setMode("WELCOME");
      }}></Header> 
      <Nav topics = {topics} onChagneMode={(_id)=>{
        setMode("READ");
        setId(_id);
      }}></Nav>
      {content}

      
    <ui>
          <li>
            <a href='/Create' onClick={(event)=>{
              event.preventDefault();
              setMode('CREATE');
            }}>Create</a>
          </li>
    
          {contextControl}
    </ui>
    </div>
  );
}


export default App;
