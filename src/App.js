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
      title:
        "프론트엔드 개발 역량 향상을 위해 어떤 노력, 준비를 했고 가장 중요시하는 부분이 무엇인지와 그 이유를 서술해주세요.",
      body: "말보다는 행동으로 혼자보다는 함께 나아가기 - 프론트엔드 개발자가 되기 위해서는 개인으로서 It지식을 쌓는 것도 물론 중요하지만 몸으로 부딪치며 공동의 목표를 가지고 프로젝트 경험을 쌓으려고 노력해왔습니다. Html, CSS, Javascript를 통해 전시 작품을 주제로 개인 프로젝트를 만들었습니다. 그러나 개인 프로젝트로 멈추지 않고 캠퍼스픽 어플을 통해 백엔드 개발자 2분을 구하는 공지를 올려 총 3명으로 이뤄진 팀 프로젝트로 발전시켜 로그인과 회원가입 기능이 추가된 미술관 웹을 제작하였습니다. 요구사항 명세서를 작성하며 서로 원하는 기능의 세부 사항을 맞춰나갔습니다. 백엔드에서는 spring을 이용해 회원들을 관리하는 데이터를 만들었고 개인이 만든 프로젝트인 만큼 동시 접속자가 많지 않고 메모리에 올려둔 데이터를 빠르게 확인할 수 있다는 장점을 가진 token방식을 활용하기로 했습니다. 프론트에서는 Jquery에서 Ajax를 이용해 데이터를 보내는 코드를 작성하였습니다. 순조롭게 진행되는가 싶었으나 CORS에러에서 긴 시간을 들여야 했습니다. 하지만 포기하지 않고 디스코드를 통해 서로의 코드를 실시간으로 확인하고 Postman을 이용해 끊임없이 테스트한 결과 URL의 경로 문제와 Ajax에서 CORS설정 오류라는 것을 깨닫고 문제를 해결할 수 있었습니다. 이렇게 총 3번의 팀 프로젝트를 통해 프론트엔드 개발자로서 가장 중요하다고 생각하는 협업 능력을 키워왔고 혼자보다는 함께 문제를 해결함으로써 서로에 대한 신뢰도 쌓을 수 있었습니다. ",
    },
    {
      id: 2,
      title:
        "자신이 진행했던 프로젝트를 기술하고 팀 프로젝트인 경우 본인이 기여한 부분을 기술해주세요.",
      body: "앱과 팀의 분위기를 디자인하다 - 프론트엔드 개발자로서 Kotlin를 활용해 지인들과 일정을 공유하고 약속을 잡는 목표를 달성하는 앱, Shallender를 제작하였습니다. 총 5명의 팀원으로 구성되었고 프론트엔드 개발자였던 저는 앱의 핵심 컬러를 선정하고 그 컬러에 맞춰 각각의 페이지의 UI를 디자인하였습니다. 웹이 아닌 앱을 디자인하는 경험이 처음이어서 걱정했지만, Android Studio를 활용하니 실제로 핸드폰과 연동이 되고 편집 툴 안에서 화면을 디자인하면 코드가 자동으로 완성되는 경험이 앱을 제작하는 흥미를 알려주었습니다. 또한 모바일 화면을 보며 디자인을 해보니 사용자 친화적인 UI를 제작하는데 또 다른 방향으로 고민해 볼 수 있는 기회였습니다. 하지만 앱을 디자인하는 흥미와는 별개로 팀의 분위기는 그렇게 좋지 않았습니다. 또 다른 프론트엔드 개발자였던 분의 포지션이 백엔드에서 프론트엔드로 넘어와 위치가 애매한 상황이었습니다. 프로젝트가 진행될수록 어떠한 기여도 하지 않은 채 시간이 흐리고 있었고 팀원의 일원으로서 올바르지 않은 태도라고 느꼈습니다. 그래서 해당 팀원과의 개별 대화를 통해 그의 어려움과 감정을 듣고 공감하고 팀원들과의 원활한 소통을 도모하기 위해 주기적인 회의와 업무 분담을 통해 투명한 협업 환경을 조성하였습니다. 덕분에 팀의 결속력을 더 단단해졌고 목표하던 기능을 추가된 앱을 만들 수 있었습니다.이렇게 프론트엔드 개발자로서 모바일 앱을 디자인하고 팀원의 일원으로 팀의 분위기를 디자인하며 개인적인 역량과 함께 팀을 이끄는 리더십도 강화할 수 있었습니다. ",
    },
    {
      id: 3,
      title:
        "커뮤니티나 운영하는 개인 저장소(깃헙 등), 블로그 등이 있다면 목적과 함께 서술해주세요. ",
      body: " 반복과 복습을 멈추지 않는 습관 - 깃헙을 이용하여 그동안 진행했던 프로젝트의 버전 관리와 팀원들과의 협업에 사용하였으며 개인 블로그인 티스토리를 이용해 프로젝트의 진행 상황과 반복되는 개념들을 상세히 기록하였습니다. 첫째, 깃헙은 팀 프로젝트와 개인 프로젝트를 진행하며 꾸준히 함께하였습니다. 팀 프로젝트에서는 팀장을 중심으로 백엔드와 프론트엔드 브런치를 나눠 소스 코드의 변경 이력을 기록하고 관리하였습니다. 이를 통해 여러 명의 개발자가 동시에 작업할 때 충돌을 방지하고, 이전 상태로 쉽게 복구할 수 있었습니다. 오픈 소스이다 보니 코드를 함께 리뷰하며 부족한 부분들을 용이하게 개선할 수 있었습니다. 둘쨰, 개인 블로그인 티스토리에는 코드 자체를 기록하기보다 프로젝트를 진행하며 발생한 수정 사항과 코드의 쓰임 등을 요약하였습니다. 또한 문제가 발생하면 해결한 과정들을 기록하였고 반복적으로 나오는 언어들과 개념들을 제가 이해한 방식으로 작성하였습니다. 더불어 프로그래머스를 통해 푼 알고리즘 문제에서 다른 사람들의 풀이도 함께 학습하며 저의 코드가 어느 지점에서 효율성이 부족한지를 분석하였습니다. 이러한 커뮤니티 사이트들은 기록하며 얻은 성장을 선물하였고 복습을 멈추지 않는 습관을 들일 수 있게 하였습니다. 앞으로도 꾸준히 기록하고 공유하며 실력을 갖춘 개발자로 성장할 수 있도록 노력할 것입니다. ",
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
