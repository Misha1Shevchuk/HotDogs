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

    removehotdog = async (event) => {
        event.preventDefault();
        console.warn('Remove hotdog: ' + this.props.element.hotdog);
        await axios.post(`http://localhost:3001/removeHotDog`, {
            id: this.props.element.id
        }).then(() => {
            this.props.getList();
        })
    }

    toggleVisibleChangeForm = () => {
        if (this.state.showChangehotdogForm === false) {
            this.setState({ showChangehotdogForm: true });
        } else {
            this.setState({ showChangehotdogForm: false });
        }
    }

    render = () => {
        return (
            <li className="item-hotdog">
                <b className="hotdog-name">  {this.props.element.hotdog}  </b><br/>
                <span className="hotdog-ingredients"><span id="ingrediends-word">Ingredients: </span>{this.props.element.ingredients}</span>
                { this.state.showChangehotdogForm ?
                    <ChangeHotDogForm toggleVisibleChangeForm={this.toggleVisibleChangeForm} getList={this.props.getList} element={this.props.element} />
                    : null }
                <button onClick={this.removehotdog} className="button-delete-item">X</button>
                <button onClick={this.toggleVisibleChangeForm} className="button-change-item">✎</button>
            </li>
        );
    }
}