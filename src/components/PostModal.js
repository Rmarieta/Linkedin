import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="images/close-icon.png" alt="" />
              </button>
            </Header>

            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="images/user.svg" alt="" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>

              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
              </Editor>
              <UploadImage>
                {assetArea === "image" ? (
                  <>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </>
                ) : (
                  assetArea === "media" && (
                    <>
                      <div>
                        <input
                          type="text"
                          placeholder="Paste a video link"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                        />
                      </div>
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </UploadImage>
            </SharedContent>

            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="img_button"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <label htmlFor="img_button">
                    <img src="images/image-postmodal.png" alt="" />
                  </label>
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="images/shared-vid.png" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="images/comment-icon.png" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: #000000;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: #fff;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 30px;
    width: 30px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    border: 5px;
    background-color: rgba(0, 0, 0, 0.12);

    :hover {
      background-color: rgba(0, 0, 0, 0.18);
    }

    img {
      background-color: transparent;
      filter: brightness(80%);
      width: 80%;
      margin-top: 4px;
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
  span {
    padding-left: 5px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
    margin-right: 5px;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  background-color: transparent;
  img {
    max-height: 20px;
    height: 80%;
    background-color: transparent;
    filter: opacity(60%);
    margin: 0 0 0 0;
    padding: 0 0 0 0;
  }
  label {
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    line-height: 3px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;

  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    font-weight: 600;
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) =>
    props.disabled ? "rgba(10,102,194,0.4)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.2)" : "#fff")};

  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(10,102,194,0.4)" : "#004182"};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    outline: none !important;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  display: flex;
  textarea {
    padding: 10px 10px 10px 10px;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    border: none;
    outline: none;
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;

  padding: 0 24px;
  margin-top: 10px;
  min-height: 30px;

  div > input {
    margin-bottom: 24px;
    animation: fadeIn 0.15s;
    float: left;
    border: none;
    font-size: 13px;
    border-radius: 5px;
    min-width: 50%;
    background-color: rgba(0, 0, 0, 0.08);
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    padding: 6px;
    margin-top: 0px;
  }

  img {
    max-width: 200px;
    max-height: 200px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
