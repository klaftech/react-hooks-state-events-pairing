import videoData from "../data/video.js";
import {useState} from "react"

function Button({buttonDisplay, onClick}){
  return (
    <button onClick={onClick}>{buttonDisplay}</button>
  )
}

function Comment({ id, user, comment}){
  return (
    <div id={id}>
      <h1>{user}</h1>
      <p>{comment}</p>
    </div>
  )
}

function CommentContainer({ isHide, video }){
  const showStatus = isHide ? 'none' : 'block'
  return (
    <div style={{display: showStatus}}>
      <h1>{video.comments.length} Comments</h1>
      <Comment id={video.comments[0].id} user={video.comments[0].user} comment={video.comments[0].comment} />
      <Comment id={video.comments[1].id} user={video.comments[1].user} comment={video.comments[1].comment} />
    </div>
  )
}

function Content(){
  
  const [video, setVideo] = useState(videoData)
  const [isHide, setHide] = useState(false)
  
  function handleUpdate(key, value){
    const newVideo = {
      ...video,
      [key]: value
    }
    setVideo(newVideo)
  }

  const handleUpVoteClick = () => {
      handleUpdate("upvotes",video.upvotes+1)
  }
  
  const handleDownVoteClick = () => {
    handleUpdate("downvotes",video.downvotes+1)
  }

  const handleHideClick = () => {
    setHide(!isHide)
  }
  
  return (
    <div>
      <h1>{video.title}</h1>
      <p>{video.views} Views | Uploaded {video.createdAt}</p>
      <Button buttonDisplay={video.upvotes + " 👍"} onClick={handleUpVoteClick} />
      <Button buttonDisplay={video.downvotes + " 👎"} onClick={handleDownVoteClick} />
      
      <p></p>
      <Button buttonDisplay={isHide ? "Show Comments" : "Hide Comments"} onClick={handleHideClick} />
      <hr></hr>

      <CommentContainer isHide={isHide} video={video} />
    </div>
  )

}


function App() {
  console.log("Here's your data:", videoData);

  return (
    <div className="App">
      <iframe
        width="919"
        height="525"
        src={videoData.embedUrl}
        frameBorder="0"
        allowFullScreen
        title={videoData.title}
      />
      <Content />
    </div>
  );
}

export default App;
