import React, { Component } from 'react';
import BooksService from '../services/BooksService';

class AddBookComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            //id has been added to reuse the existing code of add in case of update
            id:this.props.match.params.id,
            bookName: '',
            authorName: '',
            publisher: ''
        }
        this.changeBookNameHandler = this.changeBookNameHandler.bind(this);
        this.changeAuthorNameHandler = this.changeAuthorNameHandler.bind(this);
        this.changepublisherHandler = this.changepublisherHandler.bind(this);
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);

    }

    componentDidMount(){
        //incase of add just return else return the book details need to be updated.
        if(this.state.id === '_add'){
            return
        } else {
        BooksService.getBookById(this.state.id).then((res)=>{
            let book = res.data;
            this.setState({
                bookName:book.bookName,
                authorName:book.authorName,
                publisher:book.publisher
            });
        });
    }
    }



    changeBookNameHandler = (event) => {
        this.setState({ bookName: event.target.value })
    }

    changeAuthorNameHandler = (event) => {
        this.setState({ authorName: event.target.value })
    }

    changepublisherHandler = (event) => {
        this.setState({ publisher: event.target.value })
    }

    saveOrUpdateBook = (e) => {
        e.preventDefault();
        let book = { bookName: this.state.bookName, authorName: this.state.authorName, publisher: this.state.publisher }
        console.log('book => ' + JSON.stringify(book));
        if(this.state.id === '_add') {
        BooksService.saveBook(book).then(res => {
            this.props.history.push('/books')
        });
    } else {
        BooksService.update(this.state.id,book).then(res => {
            this.props.history.push('/books')
        });
    }
    }

    cancel() {
        this.props.history.push('/books');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return  <h3 className="text-center">Add Book</h3>
        } else {
            return  <h3 className="text-center">Update Book</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                           {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Book Name: </label>
                                        <input placeholder="Book Name" name="bookName" className="form-control"
                                            value={this.state.bookName} onChange={this.changeBookNameHandler} />
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label> Author Name: </label>
                                        <input placeholder="Author Name" name="authorName" className="form-control"
                                            value={this.state.authorName} onChange={this.changeAuthorNameHandler} />
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <label> Publisher Name: </label>
                                        <input placeholder="Publisher Name" name="publisher" className="form-control"
                                            value={this.state.publisher} onChange={this.changepublisherHandler} />
                                    </div>

                                    <br></br>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default AddBookComponent;