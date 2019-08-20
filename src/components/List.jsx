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

    toogleVisibilityForm = () => {
        if (this.state.showForm) {
            this.setState({ showForm: false })
        } else {
            this.setState({ showForm: true })
        }
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = async () => {
        await axios.post(`https://blooming-chamber-22236.herokuapp.com/listHotDogs`).then(response => {
            console.warn(response.data);
            this.setState({
                list: response.data.map((hotdog) => {
                    return (
                        <ItemList getList={this.getList} key={hotdog.id} element={hotdog} />
                    )
                })
            })
        })
    }

    render = () => {
        return (
            <div className="container">
                <div className="content">
                    <h4>HotDogs:</h4>
                    <ol className="hotdogs-list">
                        {this.state.list}
                    </ol>
                    <div className="new-hotdog-block">
                        {!this.state.showForm ?
                            <button onClick={this.toogleVisibilityForm} className="button-plus" >Add HotDog</button>
                            : null}
                        {this.state.showForm ?
                            <NewHotDogForm getList={this.getList} toogleVisibilityForm={this.toogleVisibilityForm} />
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}