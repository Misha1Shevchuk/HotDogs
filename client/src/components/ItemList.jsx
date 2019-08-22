import React from "react";
import axios from 'axios';
import ChangeHotDogForm from './ChangeHotDogForm';

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChangehotdogForm: false
        }
    }

    // Delete Hot Dog
    removehotdog = async (event) => {
        event.preventDefault();
        await axios.post(`/removeHotDog`, {
            id: this.props.element.id
        }).then(() => {
            this.props.getList();
        })
    }

    // Change visible form "Change Hot Dog"
    toggleVisibleChangeForm = () => {
        if (this.state.showChangehotdogForm === false) {
            this.setState({ showChangehotdogForm: true });
        } else {
            this.setState({ showChangehotdogForm: false });
        }
    }

    render() {
        return (
            <li className="item-hotdog">
                <b className="hotdog-name"> {this.props.element.hotdog} </b><br />
                <span className="hotdog-description">
                    <span id="description-word">Description: </span>
                    {this.props.element.description}
                </span>
                {this.state.showChangehotdogForm ?
                    <ChangeHotDogForm toggleVisibleChangeForm={this.toggleVisibleChangeForm}
                        getList={this.props.getList} element={this.props.element} />
                    : null}
                <button onClick={this.removehotdog} className="button-delete-item">
                    <img className="delete-img" src="img/delete.png" alt="delete" />
                </button>
                <button onClick={this.toggleVisibleChangeForm} className="button-change-item">
                    <img className="change-img" src="img/change.png" alt="change" />
                </button>
            </li>
        );
    }
}