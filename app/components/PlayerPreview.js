var React=require('React')

function PlayerPreview(props){
    return (
        <div>
        <div className="column">
        <img className="avatar" src={props.avatar} alt={"Avatar for Player"+props.username}/>
        <h2 className="userName">@{props.username}</h2>
        {props.children}
        </div>
        </div>
    )
}

module.exports=PlayerPreview;