import React from "react";
import axios from 'axios';
import NewHotDogForm from './NewHotDogForm';
import ItemList from "./ItemList";

export default class List extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            showForm: false,
        };
    }

    componentDidMount = () => {
        this.getList();
        alert("Прохання не змінювати позицій з хотдогами - створюйте нові. Дякую");
    }

    toogleVisibilityForm = () => {
        if (this.state.showForm) {
            this.setState({ showForm: false });
        } else {
            this.setState({ showForm: true });
            this.scrollToBottom()
        }
    }

    // when form visible - scroll to it
    scrollToBottom = () => {
        this.el.scrollIntoView({ behavior: 'smooth', block: "end" });
    }

    // get list Hot Dogs from server
    getList = async () => {
        await axios.post(`/listHotDogs`).then(response => {
            this.setState({
                list: response.data.map((hotdog) => {
                    return (
                        <ItemList getList={this.getList} key={hotdog.id} element={hotdog} />
                    )
                })
            })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="content">
                    <h4>Hot Dogs:</h4>
                    <ol className="hotdogs-list">
                        {this.state.list}
                    </ol>
                    <div className="new-hotdog-block">
                        {this.state.showForm ?
                            <NewHotDogForm getList={this.getList} toogleVisibilityForm={this.toogleVisibilityForm} />
                            : <button onClick={this.toogleVisibilityForm} className="button-plus">Add HotDog</button>}
                        <div ref={el => { this.el = el; }} style={{ height: 200 + 'px' }} />
                    </div>
                </div>
            </div>
        );
    }
}
