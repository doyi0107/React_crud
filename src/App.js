import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Header(props) {
  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
      let t = props.topics[i]
      lis.push(<li key={t.id}><a id={t.id} href={'/read'+t.id} onClick = {(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>)
    }
    
  return(
    <nav>
      <ol>{lis}</ol>
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

function Create(props) {
  return(
    <div>
      <h2>create</h2>
      <form onSubmit={(event)=>{
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.title.value;
          props.onCreate(title,body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea type="text" placeholder="title" /></p>
        <p><input type="submit" value="submit"/></p>
      </form>
    </div>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return(
    <div>
      <h2>update</h2>
      <form onSubmit={(event)=>{
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.title.value;
          props.onUpdate(title,body);
      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={(event)=>{
              setTitle(event.target.value);
        }}/></p>
        <p><textarea type="text" placeholder="title" value={body} onChange={(event)=>{
              setBody(event.target.value);
        }} /></p>
        <p><input type="submit" value="submit"/></p>
      </form>
    </div>
  )
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:"영화영상학과", body:"19-20살때 한서대를 다니면서 배웠던 전공입니다." },
    {id:2, title:"국어국문학과", body:"21-24살때 국민대를 다니면서 배웠던 전공입니다."},
    {id:3, title:"소프트웨어미디어전공", body:"23살때 처음 코딩을 배우면서 지금까지 공부하고 있습니다."},
  ]);

  let content = null;
  let contextControl = null;
  if(mode === "WELCOME"){
      content = <Article title="Hi, WELCOME DOYI WORID" body="Let's learn doyi's life"/>     
  }else if(mode === "READ"){
      let title, body = null;
      for (let i = 0; i< topics.length; i++) {
        if(topics[i].id === id){
            title = topics[i].title;
            body = topics[i].body;
        }
      }
      content = <Article title={title} body={body}/>
      contextControl = <><li><a href='/update/' onClick={(event)=>{
          event.preventDefault();
          setMode("UPDATE");
      }}>update</a></li>
      <li><input type="submit" value="delete" onClick={(event)=>{
            event.preventDefault();
            const newtopic=[]
            for (let i = 0; i < topics.length; i++) {
              if( topics[i].id !== id){
                  newtopic.push(topics[i])
              }
              
            }
            setTopics(newtopic);
            setMode("WELCOME");
            
      }}/></li></>
}else if(mode === "CREATE"){
      content = <Create onCreate={(_title, _body)=>{     
          const newtopic = {id:nextId, title:_title, body:_body};
          const newtopics = [...topics];
          newtopics.push(newtopic);
          setTopics(newtopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId+1);
      }}/>
}else if(mode === "UPDATE"){
      let title, body = null;
      for (let i = 0; i< topics.length; i++) {
        if(topics[i].id === id){
            title = topics[i].title;
            body = topics[i].body;
        }
      }
      content = <Update title={title} body={body} onUpdate={(_title,_body)=>{
            const updatedtopic = {id:id, title:_title, body:_body};
            const newtopics = [...topics];
            for (let i = 0; i < newtopics.length; i++) {
              if(newtopics[i].id === id){
                newtopics[i] = updatedtopic;
                break
              }
            }
            setTopics(newtopics);
            setMode("READ");
      }}/>
}

return (
    <div>
      <Header title = "DOYI WORLD"/>
      <Nav topics={topics} onChangeMode={(_id)=>{
          setMode("READ");
          setId(_id)
      }}/>
      {content}
      {contextControl}
      <li><a href='/create/' onClick={(event)=>{
          event.preventDefault();
          setMode("CREATE");
      }}>create</a></li>
    </div>
  )
}


export default App;
