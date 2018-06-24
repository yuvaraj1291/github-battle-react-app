let React= require('react');
let ReactDOM= require('react-dom');
let App=require('./components/App')

require('./index.css');



//  Now we need to render it to DOM
ReactDOM.render(<App />, 
    document.getElementById("app")
);