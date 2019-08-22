import React from "react";
import axios from 'axios';

export default class NewHotDogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotdog: "",
            description: "",
        }
        this.handleChange = this.handleChangeDescription.bind(this);
        this.handleChange = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName = event => {
        this.setState({ hotdog: event.target.value });
    }

    handleChangeDescription = event => {
        this.setState({ description: event.target.value });
    }

    // send form to server
    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.hotdog.trim() !== "") {
            await axios.post(`/newHotDog`, {
                hotdog: this.state.hotdog.replace(/\s+/g, ' ').trim(),
                description: this.state.description.replace(/\s+/g, ' ').trim()
            }).then(() => {
                this.clearForm();
                this.props.getList();
            })
        }
    }

    clearForm = () => {
        this.setState({ hotdog: "" });
        this.setState({ description: "" });
        this.props.toogleVisibilityForm();
    }

    render() {
        return (
            <form className="new-hotdog-form" name="form-send-hotdog" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.hotdog} onChange={this.handleChangeName}
                    className="new-hotdog-input" autoComplete="off" maxLength="90" placeholder="Name" />
                <br />
                <textarea className="new-hotdog-description" value={this.state.description}
                    onChange={this.handleChangeDescription} placeholder="Description" maxLength="255">
                </textarea><br />
                <input type="submit" className="button-accept" value="Add" />
                <input type="reset" onClick={this.clearForm} className="button-cancel" value="Cancel" />
            </form>
        );
    }
}