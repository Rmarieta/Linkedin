import styled from "styled-components";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <Container>
      <ShareBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="images/user.svg" alt="" />
          )}
          <button onClick={handleClick} disabled={props.loading ? true : false}>
            Start a post
          </button>
        </div>
        <div>
          <button>
            <img src="images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="images/article-icon.svg" alt="" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>

      <>
        {props.articles.length === 0 ? (
          <p>There are no articles</p>
        ) : (
          <Content>
            {props.loading && <img src="images/spin-loading.gif" />}

            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="images/3-horizontal-dots-icon.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {/* <img src="images/shared-image.png" alt="" /> */}
                      {!article.SharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img src="images/like-icon.png" alt="" />
                        <img src="images/clap-icon.png" alt="" />
                        {/* <span>222 · 2 comments · 8 reposts</span> */}
                      </button>
                    </li>
                    <li>
                      <a>
                        {Math.floor(Math.random() * 100)} · {article.comments}{" "}
                        comments
                      </a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img src="images/like-icon-2.png" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="images/comment-icon.png" alt="" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src="images/share-icon.png" alt="" />
                      <span>Repost</span>
                    </button>
                    <button>
                      <img src="images/send-icon.png" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
      </>
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      /* img {
        height: 18px;
        width: 18px;
        margin: 2px 8px 2px 2px;
      } */
    }
    :first-child {
      display: flex;
      align-items: center;
      padding: 14px 16px 0px 16px;
      img {
        width: 60px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        cursor: text;
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    :nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      padding-top: 4px;

      button {
        img {
          height: 18px;
          width: 18px;
          margin: 0 4px 0 -2px;
          filter: invert(62%) sepia(78%) saturate(818%) hue-rotate(183deg)
            brightness(10%) contrast(95%);
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  overflow: visible;
  margin: 0 0 8px;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 12px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      border-radius: 50%;
      width: 60px;
      height: 60px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 13px;
      overflow: hidden;
      margin-top: 7px;
      span {
        text-align: left;

        :first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.8);
        }
        :nth-child(n + 2) {
          font-size: 12px;
          line-height: 1.4;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }

  button {
    position: absolute;
    top: 0;
    right: 10px;
    width: 25px;
    height: 25px;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  list-style: none;
  margin: 0 10px;
  padding: 6px 0 10px;
  border-bottom: 1px solid #e9e5df;

  li {
    margin-right: 0px;
    font-size: 12px;

    button {
      display: flex;
      border: none;
      background-color: #fff;
    }
  }

  img {
    width: 15px;
    padding-left: 2px;
  }
  a {
    font-size: 12px;
    line-height: 1.68;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  //min-height: 40px;
  height: 40px;

  //border-top: solid 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 -1px 1px -1px rgba(0, 0, 0, 0.8);

  button {
    display: inline-flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.4);
    font-size: 16px;
    font-weight: 600;
    background-color: transparent;
    border: none;

    width: 100%;
    height: 100%;
    justify-content: center;

    img {
      width: 15px;
      padding-left: 2px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
    :hover {
      background-color: #f5f5f5;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
