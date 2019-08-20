import React from "react";
import axios from 'axios';

export default class NewHotDogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotdog: "",
            ingredients: "",
        }
        this.handleChange = this.handleChangeIngredients.bind(this);
        this.handleChange = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName = event => {
        this.setState({ hotdog: event.target.value });
    }

    handleChangeIngredients = event => {
        this.setState({ ingredients: event.target.value });
    }
    
    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.hotdog !== "") {
            console.warn('Add HotDog: ' + this.state.hotdog);
            await axios.post(`https://blooming-chamber-22236.herokuapp.com/newHotDog`, {
                hotdog: this.state.hotdog,
                ingredients: this.state.ingredients
            }).then(() => {
                this.clearForm();
                this.props.getList();
            })
        }
        // додати перевірку
    }

    clearForm = () => {
        this.setState({ hotdog: "" });
        this.setState({ingredients: ""});
        this.props.toogleVisibilityForm();
    }

    render = () => {
        return (
            <form className="new-hotdog-form" name="form-send-hotdog" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.hotdog} onChange={this.handleChangeName} className="new-hotdog-input" autoComplete="off" maxLength="90" placeholder="Name" /><br />
                <textarea className="new-hotdog-ingredients" value={this.state.ingredients} onChange={this.handleChangeIngredients} placeholder="ingredients" maxLength="255"></textarea><br/>
                <input type="submit" className="button-accept" value="Add" />
                <input type="reset" onClick={this.clearForm} className="button-cancel" value="Cancel" />
            </form>
        );
    }
}