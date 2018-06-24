let React=require('react')
var PropTypes = require('prop-types')

var styles = {
    content:{
    textAlign: 'center',
    fontSize: '35px'
    } 
}

class Loading extends React.Component {
   constructor(props){
       super(props);
       this.state={
           text: this.props.text,
           speed: this.props.speed
       }
   }
   componentDidMount(){
       var stopper= this.props.text + '...';
       this.interval = window.setInterval(()=>{
            if(this.state.text===stopper){
                this.setState(()=>{
                    return {
                        text:this.props.text
                    }
                })
            }else{
                this.setState((prevState)=>{
                return {
                    text:prevState.text+'.'
                }})
            }
       }, this.props.speed)
   }
   componentWillUnMount(){
        window.clearInterval(this.interval);
   }
    render(){
        return(
            <p style={styles.content}>
             {this.state.text}
            </p>
        )   
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}


module.exports=Loading;