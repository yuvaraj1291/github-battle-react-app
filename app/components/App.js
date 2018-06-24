var React = require('react')
var Popular = require('./Popular')
var ReactRouter= require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home')
var Battle = require('./Battle')
var Result = require('./Result')

// Props of the Component:
//1. state
//2. lifecycle event
//3. UI


// Violation of seperation of concerns. having HTML to Javascript
// Babel transforms the JSX into React.createElement - Gives the flexibility to write HTML rather than having raw JS 
class App extends React.Component{
    // to specify how the UI looks like 
    render(){
        return(
            <Router>
            <div className="container">
                <Nav />
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/battle" component={Battle}/>
                <Route path="/battle/results" component={Result}/>
                <Route path="/popular" component={Popular} />
                <Route render={
                    function(){
                        return <p> Page Not Found </p>
                    }
                } />
                </Switch>
            </div>
            </Router>
           
        )
    }
}

module.exports=App