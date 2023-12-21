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
      <h2>CREATE</h2>
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
      <h2> UPDATE</h2>
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
      body: "상상이 현실이 되는 프론트나라 - 작은 종이를 잘라 하나의 집을 완성하는 일을 좋아했던 10살의 나는 이제는 코드를 붙여 하나의 웹을 완성하는 일을 하는 개발자로 성장하고 싶습니다. 내가 상상한 그림을 작은 컴포넌트들로 표현하고 그 조각들이 모여 점점 하나의 화면으로 완성하는 작업이 저에게 큰 성취감을 주었습니다. 더 나아가 서버와 연결을 할 수 있는 동적인 서비스로 발전하고 컴포넌트 간의 상호작용이 된다는 것이 정말 환상적이라고 느껴졌습니다.더불어, 이 직업이 끌렸던 이유는 프론트엔드 개발자는 디자이너와 백엔드 개발자 사이에서 다리가 되어주는 중요한 역할이었기 때문입니다. 평소 사람을 좋아하는 저는 팀원들과 의견을 조율하며 나아가는 활동에 자신이 있고 선호하기 때문입니다.그렇게 함께 완성한 웹과 앱을 사용하는 사용자들이 생기고 사람들에게 피드백을 받으며 발전된 웹을 만드는 개발자를 꿈꾸고 있습니다. 그중에서도 웹의 첫 이미지를 결정하는 프론트엔드 개발자가 더 매력적으로 다가오지만 개발자의 위치에서 성장할 수 있는 자리가 생긴다면 어디서든 그 기회를 잡고 싶습니다.",
    },
    {
      id: 2,
      title: "개발자로서 나의 차별적인 강점은 무엇인가?",
      body: "확실한 피드백 받고 겁없는 기백까지 - 미술관을 주제로 반응형 웹을 만들었던 적이 있었습니다. 개발을 시작하고 처음 만들었던 웹인 만큼 시간이 흐르고 웹을 다시 봤을 때는 정리되지 않은 레이아웃과 디자인들이 눈에 들어왔습니다. 추가로 백엔드와 연결하는 코드를 경험하고 싶어 로그인과 회원가입 기능을 염두에 두었습니다.UI를 수정한 뒤 캠퍼스픽 앱을 통해 백엔드 개발자를 구하는 공지를 올렸고 마음이 맞는 개발자 2분과 협업하게 되었습니다. 백엔드에서는 spring을 이용해 회원들을 관리하는 데이터를 만들었고 프론트에서는 Jquery에서 Ajax를 이용해 데이터를 보내는 코드를 작성하였습니다. 순조롭게 진행되는가 싶었으나 회원 데이터가 백엔드로 보내지지 않아 긴 시간 애를 먹었습니다. 백엔드에서는 Postman으로 테스트한 결과 문제가 없으니 프론트에서 확인해보라는 말뿐이었습니다. 그러나 URL이 맞으면 백엔드쪽에 에러 메시지라도 가는 게 맞다고 생각했고 백엔드 개발자분들과 지속해서 소통하려고 노력했습니다. 그 결과 URL의 경로 문제가 맞아 에러 메시지가 출력됐고 그 에러는 CORS에서 난 에러였습니다. 하지만 CORS 문제는 큰 시간을 들이지 않고 해결할 수 있었고 원하는 기능을 추가한 미술관 웹을 완성할 수 있었습니다. 이렇게 저는 하나의 팀을 모으고 프로젝트를 만들어가는 기백과 팀원들과 함께 문제를 해결하기 위해 확실한 피드백을 줄 수 있는 강점을 가진 개발자입니다.",
    },
    {
      id: 3,
      title: "개발자가 되기 위해 어떤 노력을 하였는가?",
      body: " 나의 길을 찾은 콜럼버스 - 개발자를 선택하기까지 여러 갈림길에서 방황했습니다. 내가 무엇을 좋아하고 어떤 사람인지 깨달은 이후 목표를 설정하고 길을 개척했습니다. 컴퓨터 학원에서 기본적인 Html, Css, Javascript를 공부한 뒤 팀 프로젝트를 경험하기 위해 커뮤니티 사이트를 통해 프로젝트에 참여하였습니다. 팀원들과 협업하며 코드를 구현하고 배포하는 과정에 참여하며 내가 어떤 부분에서 부족한지 깨달았습니다. github, notion과 같은 협업 도구는 물론, 백엔드 개발자와 소통하기 위해서는 그들의 언어도 공부할 필요성을 느꼈습니다. 프론트엔드 개발자로서 개인 역량을 키우기 위해 더 배워야 하는 기술을 온라인 강의 등을 통해 공부하고 학습한 내용을 개인 t-story에 기록하기 시작했습니다. 후에 참여한 프로젝트에서는 문제가 발생하면 해결하는 과정들을 자세히 기록하고 개선 사항을 따로 적어두었습니다. 추가로 매일 한 문제씩 푼 알고리즘 문제의 풀이 과정도 기록해놓았습니다. 다른 사람의 풀이 과정과 비교하며 나의 코드가 효율성이 떨어지는 이유가 무엇인지, 반복되는 부분은 어디인지 등을 분석하며 정리하였습니다. 지금도 새로운 기술의 동향을 살피며 개발자로서 어떻게 더 성장할 수 있을까를 고민합니다. 이 회사에 입사하여 미지의 도전을 받아들이고 동료들과 새로운 해결책과 아이디어를 내며 함께 성장하고 싶습니다.",
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
          // 복제된 객체에 새로운 토픽 넣기
          newtopics.push(newtopic);
          // 복제된 객체 출력
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
