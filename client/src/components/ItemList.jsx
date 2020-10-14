import React from "react";
import axios from 'axios';
import ChangeHotDogForm from './ChangeHotDogForm';

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showChangehotdogForm: false,
        }
    }

    removeHotDog = event => {
        event.preventDefault();
        axios.delete(`/api/hotdogs?_id=${this.props.element._id}`)
            .then(() => this.props.getList());
    };

    toggleVisibleChangeForm = () => {
        const newState = !this.state.showChangehotdogForm;
        this.setState({showChangehotdogForm: newState});
    };

    render() {
        const {element, getList} = this.props;
        
        return (
            <li className="item-hotdog">
                <b className="hotdog-name"> {element.name} </b>
                <br/>
                <span className="hotdog-description">
                    <span id="description-word">Description: </span>
                    {element.description}
                </span>
                {this.state.showChangehotdogForm 
                    ? <ChangeHotDogForm toggleVisibleChangeForm={this.toggleVisibleChangeForm}
                                        getList={getList} 
                                        element={element}
                      />
                    : null}
                <button onClick={this.removeHotDog} 
                        className="button-delete-item">
                    <img className="delete-img" 
                        src="img/delete.png" 
                        alt="delete"/>
                </button>
                <button onClick={this.toggleVisibleChangeForm} 
                        className="button-change-item">
                    <img className="change-img" 
                        src="img/change.png" 
                        alt="change"/>
                </button>
            </li>
        );
    }
}