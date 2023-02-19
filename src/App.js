import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  console.log('props',props.title);
  return (
    <header>
        <h1><a href='/read/' onClick={(event) => {
          event.preventDefault();
          props.onChangeMode();

        }}>{props.title}</a></h1>
      </header>

  )
}

function Nav(props){
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id={t.id} href={'/read/' + t.id} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));

    }}>{t.title}</a></li>)
  }

  return (
    <nav>
        <ol>
          {lis}
        </ol>
      </nav>

  )
}

function Article(props){
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>

  )
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        // event.target은 event가 발생한 태그를 가르킨다. -> form 태그 
        // submit을 눌렀을 때 발생하는 이벤트는 form태그에서 발생한 것이기 때문이다. 
        const body = event.target.title.value;
        // 그렇게 가져오 title과 body의 value값을 사용자에게 공급하면 된다. 

        //  사용자는 어떻게 create컴포넌트로 부터 sumbit 정보를 공급받을까?? -> onCreate
        props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name='body' placeholder='title'></textarea></p>
      <p><input type="submit" value="Create" ></input></p>
    </form>
  </article>
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
  <h2>Update</h2>
  <form onSubmit={(event)=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.title.value;
      props.onUpdate(title, body);
  }}>
    <p><input type="text" name="title" placeholder="title" value={title} 
    onChange={(event)=>{setTitle(event.target.value);}}
    >    
    {/* 새로운 값을 입력할때마다 setTitle의 값을 지정하는 것  */}
      </input></p>
    <p><textarea name='body' placeholder='title' value={body} onChange={(event)=>{
      setBody(event.target.body)
    }}></textarea></p>
    <p><input type="submit" value="Update" ></input></p>
  </form>
</article>
  
}

function App() {
  // const _mode = useState('welcome');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState( [
    {id:1 , title:'html', body:'html is ....'},
    {id:2 , title:'css', body:'css is ....'},
    {id:3 , title:'javascript', body:'javascript is ....'},

  ]);


  let content = null;
  let contextControl = null;


  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title,body = null;
    for ( let i = 0; i < topics.length; i++ ) {
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }


    content = <Article title={title} body={body}></Article>

    contextControl = <><li><a href={'/Update/'+id} onClick={(event) => {
      event.preventDefault();
      setMode('UPDATE');
    }}>update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = []
      for(let i = 0; i<topics.length; i++){
        if(topics[i].id !== id)
        {newTopics.push(topics[i]);}

      }
      setTopics(newTopics);
      setMode('WELCOME');
    }}/></li>
    </> 




  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
        const newTopic = {id:nextId , title:_title, body:_body}
        // topics.push(newTopic); -> x 
        // 결과는 state를 읽을 때 생긴다. 
        const newTopics = [...topics]
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode('READ'); 
        // mode가 reload될 때 READ로 바뀌는 것 
        setId(nextId);
        setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let title,body = null;
    for ( let i = 0; i < topics.length; i++ ) {
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }


    content = <Update title={title} body={body} onUpdate={(title,body)=>{
        const updatedTopic = {id:id, title:title, body:body}
        const newTopics = [...topics]
        for(let i = 0; i<newTopics.length; i++ ){
          if(newTopics[i].id === id){
            newTopics[i] = updatedTopic;
            break;
          }
          setTopics(newTopics);
          setMode('READ');

        }
    }}></Update>
  }



  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode = ('WELCOME');
              }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <li><a href='/CREATE' onClick={(event)=> {
        event.preventDefault();
        setMode('CREATE');
      }}>create</a></li>
      {contextControl}
    </div>
  );
}

export default App;
