import React, { Component } from 'react';
import MovieService from '../services/MovieService';

class ListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            show: false,
            edit: false,
            form: { id: null, moviename: '', directorname: '', rating: '' }
        }
    }

    componentDidMount() {
        MovieService.getAll().then((res) => {
            this.setState({ items: res.data })
        })
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState(prev => ({
            form: { ...prev.form, [name]: value }
        }));
    }

    onAdd = () => {
        this.setState({
            show: true,
            edit: false,
            form: { id: null, moviename: '', directorname: '', rating: '' }
        });
    }

    onEdit = (item) => {
        this.setState({
            show: true,
            edit: true,
            form: { ...item }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const movie = this.state.form;

        if (this.state.edit) {
            MovieService.update(movie.id, movie).then(res => {
                this.setState({
                    items: this.state.items.map(i => i.id === movie.id ? movie : i),
                    show: false
                })
            })
        } else {
            MovieService.create(movie).then(res => {
                this.setState({
                    items: [...this.state.items, res.data],
                    show: false
                })
            })
        }
    }

    onCancel = () => this.setState({ show: false });

    deleteItem(id) {
        MovieService.delete(id).then(res => {
            this.setState({
                items: this.state.items.filter(i => i.id !== id)
            })
        })
    }

    render() {
        return (
            <div className="container mt-4">
                <h2 className="text-center">Movie Management App</h2>

                <div className="mb-3">
                    <button className="btn btn-primary" onClick={this.onAdd}>
                        Add New Movie
                    </button>
                </div>

                {this.state.show && (
                    <div className="card p-4 mb-4 shadow-sm">
                        <h4>{this.state.edit ? "Update Movie" : "Add New Movie"}</h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="mb-3">
                                <label>Movie Name</label>
                                <input type="text" name="moviename" className="form-control"
                                    value={this.state.form.moviename}
                                    onChange={this.onChange} required />
                            </div>
                            <div className="mb-3">
                                <label>Director Name</label>
                                <input type="text" name="directorname" className="form-control"
                                    value={this.state.form.directorname}
                                    onChange={this.onChange} required />
                            </div>
                            <div className="mb-3">
                                <label>Rating</label>
                                <input type="text" name="rating" className="form-control"
                                    value={this.state.form.rating}
                                    onChange={this.onChange} required />
                            </div>
                            <button type="submit" className="btn btn-success me-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
                        </form>
                    </div>
                )}

                <table className="table table-bordered shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Movie Name</th>
                            <th>Director Name</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map(item =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.moviename}</td>
                                    <td>{item.directorname}</td>
                                    <td>{item.rating}</td>
                                    <td>
                                        <button
                                            className="btn btn-info me-2 text-white"
                                            onClick={() => this.onEdit(item)}>
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => this.deleteItem(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ListComponent;