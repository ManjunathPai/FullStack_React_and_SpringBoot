import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListBooksComponent from './components/ListBooksComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddBookComponent from './components/AddBookComponent';
import UpdateBookComponent from './components/UpdateBookComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListBooksComponent}></Route>
            <Route path="/books" component={ListBooksComponent}></Route>
            <Route path="/add-book/:id" component={AddBookComponent}></Route>
            {/*to reuse the add book code commenting update book*/}
            {/* <Route path="/update-book/:id" component={UpdateBookComponent}></Route> */}
            {/* <ListBooksComponent /> */}
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
