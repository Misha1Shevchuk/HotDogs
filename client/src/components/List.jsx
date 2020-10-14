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

    componentDidMount() {
        this.getList();
    };

    toogleVisibilityForm = () => {
        if (this.state.showForm) {
            this.setState({showForm: false});
        } else {
            this.setState({showForm: true});
            this.scrollToBottom();
        }
    };

    scrollToBottom = () => {
        this.el.scrollIntoView({behavior: 'smooth', block: "end"});
    };

     getList = async () => {
        const hotDogs = await axios.get(`/api/hotdogs`);
        this.setState({
            list: hotDogs.data.map(hotDog => (<ItemList getList={this.getList} key={hotDog._id} element={hotDog}/>))
        });
    };

    render() {
        const { list, showForm } = this.state;
        
        return (
            <div className="container">
                <div className="content">
                    <h4>Hot Dogs:</h4>
                    <ol className="hotdogs-list">
                        {list}
                    </ol>
                    <div className="new-hotdog-block">
                        {(showForm) 
                            ? <NewHotDogForm getList={this.getList} 
                                        toogleVisibilityForm={this.toogleVisibilityForm}
                              />
                            : <button onClick={this.toogleVisibilityForm} 
                                        className="button-plus">Add HotDog
                              </button>}
                        <div ref={(el) => this.el = el} style={{height: 200 + 'px'}}/>
                    </div>
                </div>
            </div>
        );
    }
}
