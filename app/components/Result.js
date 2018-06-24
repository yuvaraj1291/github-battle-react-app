let React=require('react')
let queryString= require('query-string');
let api=require('../utils/api');
let PlayerPreview=require('./PlayerPreview')
let Loading=require('./Loading')
function Profile(props){
    let info=props.info;
    return(
        <PlayerPreview avatar={info.avatar_url} username={info.login} >
        <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
      </PlayerPreview>
    )
}

function Player(props){
   return (
   <div>
        <h1 className="header">{props.label}</h1>
        <h1 style={{textAlign:'center'}}>{props.score}</h1>
        <Profile info={props.profile}/>
    </div>
   )
}

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        var players=queryString.parse(this.props.location.search);
        console.log("palyer name ", players.playerOneName);
        console.log(" player tow name ",  players.playerTwoName);
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function(results){
            if(results===null){
                return this.setState(function() {
                return {
                    error: 'Error occured while finding the winner check whether the users exist in Github',
                    loading: false
                }
            });
        }
        console.log('results',results)
        this.setState(function(){
            return {
            winner: results[0],
            loser: results[1],
            loading: false
        }
        });
    }.bind(this)); 
    }

    render(){
        console.log(this.state.winner);
        console.log(this.state.winner)
        var loading=this.state.loading;
        var error=this.state.error;
        var winner=this.state.winner;
        var loser=this.state.loser;
        if(loading===true)
        {
            return(
                <Loading/>
            )
         }
         if(error === true){
             <div>
                 <p>{error}</p>
                 <Link to="/battle">Reset </Link>
            </div>
         }
         return(
             <div className="row">
                 <Player label="Winner" score={winner.score} profile={winner.profile} />
                 <Player label="Loser" score={loser.score} profile={loser.profile} />
             </div>
         )    

    }
}

module.exports=Result;