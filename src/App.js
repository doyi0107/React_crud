import "./App.css";
import { useEffect, useState } from "react";
import "./reset.css";
import "./App.scss";
import Background from "./Background";

function Header(props) {
  return (
    <div class="container">
      <div class="neon">{props.title}</div>
      <div class="flux">{props.title_2}</div>
    </div>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li class="nav" key={t.id}>
        <a
          id={t.id}
          href={"/read" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          º {t.title}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
    </article>
  );
}

function Create(props) {
  return (
    <div class="create_from">
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p class="title">
          <input type="text" name="title" placeholder="제목을 입력하세요." />
        </p>
        <p class="text">
          <textarea type="text" name="body" placeholder="내용을 입력하세요." />
        </p>
        <p class="submit">
          <input type="submit" value="submit" />
        </p>
      </form>
    </div>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <div>
      <h2> Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p class="title">
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p class="text">
          <textarea
            type="text"
            name="body"
            placeholder="내용을 입력하세요."
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          />
        </p>
        <p class="submit">
          <input type="submit" value="submit" />
        </p>
      </form>
    </div>
  );
}

function App() {

  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "왜 개발자가 되고 싶은가?",
      body: "상상이 현실이 되는 프론트나라 - 나의 길을 찾기 위해 여러 갈림길에서 방황하던 중 지인을 통해 접하게된 프론트엔드 개발자에 호기심이 생겼습니다. 만들고 제작하던 걸 좋아하던 어렸을 적 성향을 고려하여 개발자 과정을 배우기 시작했습니다. 내가 상상한 그림을 작은 컴포넌트들로 표현하고 그 조각들이 모여 점점 하나의 화면으로 완성하는 작업들이 저에게 큰 성취감을 주었습니다.더 나아가 서버와 연결이 가능한 동적인 서비스로 발전하고 컴포넌트들 끼리 상호작용 한다는 것이 정말 환상적이라고 느껴졌습니다. 또한 이 직업이 더 끌렸던 이유는 프론트엔드 개발자는 디자이너와 백엔드 개발자 사이에서 다리가 되어주는 중요한 역할이었기 때문입니다. 평소 사람을 좋아하는 저는 소통의 중심이 되는 역할에 자신이 있고 선호하기 때문입니다.그렇게 함께 완성한 웹과 앱을 사용하는 사용자가 생기고 사람들에게 피드백을 받으며 발전된 웹을 만드는 개발자를 꿈꾸고 있습니다. 그중에서도 웹의 첫 이미지를 결정하는 프론트가 더 매력적으로 다가오지만 개발자의 위치에서 성장할 수 있는 자리가 생긴다면 어디서든 그 기회를 잡고 싶습니다.",
    },
    {
      id: 2,
      title: "개발자로써 나의 차별적인 강점은 무엇인가?",
      body: "확실한 피드백 받고 겁없는 기백까지 - 처음 프론트엔드 개발자의 과정을 접하고 미술관을 주제로 만들었던 웹이 있었습니다. html, css, javascript만을 이용한 반응형 웹이었습니다. 시간이 지나고 웹을 다시 봤을 때는 정리되지 않은 레이아웃과 디자인들이 눈에 들어왔고 다시 제작하는 시간을 가졌습니다. 추가로 백엔드와 연결하는 코드를 경험하고 싶어 로그인과 회원가입 기능을 염두해 두었습니다. 그 뒤로 캠퍼스픽이라는 어플에 백엔드 개발자를 구하는 공지를 올렸고 마음이 맞는 개발자 2분과 협업하게 되었습니다. 백엔드에서는 spring을 이용해 회원들을 관리하는 데이터를 만들었고 개인이 만든 프로젝트인만큼 동시 접속자가 많지 않고 메모리에 올려둔 데이터를 빠르게 확인할 수 있다는 장점을 가진 token방식을 활용하기로 했습니다. 프론트에서는 jquery에서 ajax를 이용해 데이터를 보내는 코드를 작성하였습니다. 순조롭게 진행되는 가 싶었으나  데이터가 백엔드로 보내지지 않아 긴 시간 애를 먹었습니다. 백엔드에서는 postman으로 테스트한 결과 문제가 없으니 프론쪽에서 확인해보라는 말뿐이었습니다. 그러나 저는 url가 맞으면 백엔드쪽에서 에러 메시지라도 갈텐데 라는 생각을 계속했고 백엔드개발자 분들과 문제의 원인이 무엇인지 같이 소통하려고 지속적으로 노력했습니다. 그 결과 url의 경로 문제가 맞았고 경로를 수정한 뒤에도 cors에서 에러가 났으나 그 문제는 큰 시간을 들이지 않고 해결해서 원하는 기능을 추가한 미술관 웹을 완성할 수 있었습니다. 다수가 문제가 있다고 하는 쪽에 원인이 있는 것 같지만 다 같이 이야기를 나누다 보니 진짜 문제를 찾을 수 있었습니다. 이렇게 하나의 팀을 모으고 프로젝트를  만들어가는 기백과 팀원들과 함께 문제를 해결하기 위해 확실한 피드백을 줄 수 있는 강점을 가진 개발자로써 이 회사에 도움이 되는 개발자가 될 수 있다고 확신합니다.",
    },
    {
      id: 3,
      title: "개발자가 되기 위해 어떤 노력을 하였는가?",
      body: " 반복의 복습의 중요성을 아는 사람 - 프로젝트를 새로 시작하고 github와 연결을 하려고 보니 자주 사용하던 명령어임에도 까먹었던 적이 있었습니다. 반복된 명령어임에도 불구하고 잊어버렸던 경험이 기록의 필요성을 느끼게 하였습니다. 그 이후로는 새로운 지식을 습득했을 때는 물론이고 반복되는 명령어는 저 나름대로의 방식으로 정리하고 있습니다. 시간이 지나고 꽤 많은 정보들이 쌓이다보니 나만의 사전이 완성되었습니다. 그래서 반복된 문제들에 부딪힐 때는 시간을 단축할 수 있게 되었습니다. 또한 티스토리에 추가로 매일 한문제씩 푼 알고리즘 문제의 풀이 과정도 기록해놓았습니다. 다른 사람의 풀이 과정과 비교하며 나의 코드가 어디서 반복되는 부분이 많은지 어디가 부족한지등을 분석하며 정리하였습니다. 그렇게 분석하며 새로 알게 된 지식은 따로 표기해두었습니다. 그러다보니 처음에는 갈피를 잡지 못했던 문제들도 수월하게 풀 수 있게 되었습니다. 마지막으로 1일 1커밋을 유지하기 위해 노력하였습니다. 1일 1커밋을 목적으로 두니 다른 스케쥴이 있는 날도 꼭 적은양이더라도 코드를 적으며 배웠던 지식은 복습하는 습관이 생겼습니다.이렇게 반복과 복습을 통해 개발자로써 꾸준히 성장하기 위해 노력하였습니다. 그렇지만 혼자서는 한계가 있는 성장을 이 회사에 입사하여 더 멋진 개발자로써 한걸음 나아가고 싶습니다",
    },
  ]);

  let content = null;
  let contextControl = null;
  if (mode === "WELCOME") {
    content = (
      <Article
        title="Hi, WELCOME DOYI WORID"
        body="Let's learn doyi's developer life"
      />
    );
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />;
    // contextControl
    contextControl = (
      <>
        {/* update */}
        <li class="update">
          <a
            href="/update/"
            onClick={(event) => {
              event.preventDefault();
              setMode("UPDATE");
            }}
          >
            update
          </a>
        </li>

        {/* delete */}
        <li class="delete">
          <input
            type="submit"
            value="delete"
            onClick={(event) => {
              event.preventDefault();
              const newtopic = [];
              for (let i = 0; i < topics.length; i++) {
                if (topics[i].id !== id) {
                  newtopic.push(topics[i]);
                }
              }
              setTopics(newtopic);
              setMode("WELCOME");
            }}
          />
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newtopic = { id: nextId, title: _title, body: _body };
          const newtopics = [...topics];
          newtopics.push(newtopic);
          setTopics(newtopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      />
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(_title, _body) => {
          const updatedtopic = { id: id, title: _title, body: _body };
          const newtopics = [...topics];
          for (let i = 0; i < newtopics.length; i++) {
            if (newtopics[i].id === id) {
              newtopics[i] = updatedtopic;
              break;
            }
          }
          setTopics(newtopics);
          setMode("READ");
        }}
      />
    );
  }

  useEffect(() => {
    let cursorBig = document.querySelector(".big");
    let cursorSmall = document.querySelector(".small");

    document.addEventListener("mousemove", function (e) {
      let x = e.clientX;
      let y = e.clientY;
      
      cursorSmall.style.left = x + "px";
      cursorSmall.style.top = y + "px";

      cursorBig.style.left = x + "px";
      cursorBig.style.top = y + "px";
    });

 
  },);

  return (
    <div>
      <Header title="DOYI" title_2="WORLD" />

      {/* 마우스 커서 스타일 */}
      <div>
        <div class="cursor small"></div>
        <div class="cursor big"></div>
      </div>

      <div class="nav_article">
        {/* nav */}
        <div class="nav_wrap">
          <Nav
            topics={topics}
            onChangeMode={(_id) => {
              setMode("READ");
              setId(_id);
            }}
          />
        </div>

        {/* article */}
        <div class="article_wrap">
          <div class="content">{content}</div>

          <div class="button_wrap">
            <li class="create_button">
              <a
                href="/create/"
                onClick={(event) => {
                  event.preventDefault();
                  setMode("CREATE");
                }}
              >
                create
              </a>
            </li>
            {/* update / delete 버튼이 있음 */}
            {contextControl}
          </div>
        </div>
      </div>

      <Background />
    </div>
  );
}

export default App;
