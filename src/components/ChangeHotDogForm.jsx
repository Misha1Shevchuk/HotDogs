import React from "react";
import axios from 'axios';

export default class ChangeHotDogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newNameHotDog: this.props.element.hotdog,
            ingredients: this.props.element.ingredients
        }
        this.handleChange = this.handleChangeIngredients.bind(this);
        this.handleChange = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName = event => {
        this.setState({ newNameHotDog: event.target.value });
    }

    handleChangeIngredients = event => {
        this.setState({ ingredients: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.newNameHotDog !== "") {
            console.warn('Change HotDog ' + this.props.element.hotdog + " to " + this.state.newNameHotDog);
            await axios.post(`http://localhost:3001/changeHotDog`, {
                id: this.props.element.id,
                hotdog: this.state.newNameHotDog,
                ingredients: this.state.ingredients
            }).then(() => {
                this.props.toggleVisibleChangeForm();
                this.props.getList();
            })
        } else {
            console.log("Enter new name of hotdog");
        }
    }

    render = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"  className="change-hotdog-input" value={this.state.newNameHotDog} onChange={this.handleChangeName} maxLength="90"/><br/>
                <textarea className="change-hotdog-ingredients" value={this.state.ingredients} onChange={this.handleChangeIngredients} placeholder="ingredients" maxLength="255"></textarea><br/>
                <input className="button-accept" type="submit" value="Change" />
                <input className="button-cancel" type="reset" onClick={this.props.toggleVisibleChangeForm} value="Cancel" />
            </form>
        );
    }
}