let React=require('react')
let PropTypes=require('prop-types')
let api = require('../utils/api')
let Loading = require('./Loading')
var SelectedLanguage=function(props){
    let languages = ["All", "C++", "Java", "Python", "Ruby"]  
    return (
        <ul className='languages'>
        {
            languages.map((lang) => {
            return ( <li onClick={props.updateLang.bind(null, lang)} key={lang} style={lang===props.lang ? {color:'#d0021b'}:null}>
                 {lang} 
                 </li>
                 )
            }, this)}
            </ul>
    )
}
function RepoGrid(props){
    return (
        <ul className='popular-list'>
             {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            selectedLanguage : "All",
            repos : null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(lang){
       // console.log('lang ', lang);
        this.setState(
            () => {
               return {selectedLanguage: lang}
            }
        )
        api.fetchPopularRepos(lang)
        .then(function(repos){
            this.setState(()=>{
                    return {
                        repos: repos,
                    }
                });
        }.bind(this));
    };

    render(){ 
        return(
            <div>
           <SelectedLanguage updateLang={this.updateLanguage} lang={this.state.selectedLanguage}/>
           {
           !this.state.repos ? <Loading />:
           <RepoGrid repos={this.state.repos} />
           }
           </div>
        )
    }
}

module.exports = Popular