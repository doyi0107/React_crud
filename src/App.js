import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  return(
    <header><h1><a href='/cleck' onClick={event=>{
      props.onChangeMode();
      event.preventDefault();
    }}>{props.title}</a></h1></header>
  )
}
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
      let t = props.topics[i];
      lis.push( <li key={t.id}><a id={t.id} href={'/read/'+t.id } onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>)
  }
  return( 
    <nav>
      <ol>{lis}</ol></nav>   
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

function Create(props) {
  return(
    <article>  
      <h2>create</h2>
        <form onSubmit={(event)=>{
              event.preventDefault();
              const title = event.target.title.value;
              const body = event.target.body.value;
              props.onCreate(title,body);
        }}>
          <p><input type="text" name="title" placeholder='title'></input></p>
          <p><textarea name='body' placeholder='title'></textarea></p>
          <p><input  type="submit" value="create"></input></p>
        </form>
    </article>
  )
}


function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <article>  
      <h2>update</h2>
        <form onSubmit={(event)=>{
              event.preventDefault();
              const title = event.target.title.value;
              const body = event.target.title.value;
              props.onUpdate(title,body);
        }}>
          <p><input type="text" name="title" placeholder="title" value={title} onChange={(event)=>{
                  setTitle(event.target.value);
          }}></input></p>
          <p><textarea name="body'" placeholder="body"  value={body} onChange={(event)=>{
                  setBody(event.target.body);
          }}></textarea></p>
          <p><input  type="submit" value="update"></input></p>
        </form>
    </article>
  )
}



function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id:1, title:"html", body:"html is ..."},
    { id:2, title:"css", body:"css is ..."},
    { id:3, title:"javascript", body:"javascript is ..."}   
  ]);
  const [nextid, setNextid] = useState(4);
  //선택된 값  

  let content = null;
  let contextControl = null;
  if(mode==="WELCOME"){
        content = <Article title="Welcome" body="hello, web"/>
  }else if(mode==="READ"){
        let title, body = null;
        for (let i = 0; i < topics.length; i++) {
          if( topics[i].id === id ){
            title = topics[i].title;
            body = topics[i].body;
          }         
        }
        content = <Article title={title} body={body}/>
        contextControl = <><li><a href='/update/' onClick={(event)=>{
          event.preventDefault();
          setMode("UPDATE");
        }}>Update</a></li>
        <li><input type="button" value="delete" onClick={()=>{       
          const newTopics=[];
          for (let i = 0; i< topics.length; i++) {
            if(topics[i].id !== id){
              newTopics.push(topics[i]);
            }
            setTopics(newTopics);
            setMode('WELCOME');
          }
        }}></input></li></>

  }else if (mode==="CREATE"){
      content = <Create onCreate = {(_title,_body)=>{
            const newtopic = {id:nextid ,title:_title, body:_body};
            const newtopics = [...topics];
            newtopics.push(newtopic);
            setTopics(newtopics);
            setMode("READ");
            setId(nextid);
            setNextid(nextid+1);
            
      }}></Create>
  }else if (mode==="UPDATE"){
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if( topics[i].id === id ){
        title = topics[i].title;
        body = topics[i].body;
      }         
    }
      content = <Update title={title} body={body} onUpdate={(_title,_body)=>{
        const updatedTopic = {id:id, title:_title, body:_body};
        const newTopic = [...topics];
        for (let i = 0; i < newTopic.length; i++) {
          if (newTopic[i].id === id) {
              newTopic[i] = updatedTopic;
              break;
          
        }
      }
      setTopics(newTopic);
      setMode("READ");

      }}></Update>
  }

  return (
    <div>
      <Header title = "WEB" onChangeMode={()=>{
        setMode("WELCOME");
      }} />
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode("READ");
        setId(_id);
      }}/>
      {content}
      {contextControl}
      <li><a href='/enter/' onClick={(event)=>{
        event.preventDefault();
        setMode("CREATE");
      }}>Create</a></li>
      
    </div>
  );
}


export default App;
