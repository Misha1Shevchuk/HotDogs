import React from "react";
import axios from 'axios';

export default class ChangeHotDogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newNameHotDog: this.props.element.name,
            description: this.props.element.description
        };
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChangeName = event => {
        this.setState({newNameHotDog: event.target.value});
    };

    handleChangeDescription = event => {
        this.setState({description: event.target.value});
    };

    handleSubmit = async event => {
        event.preventDefault();

        if (!this.state.newNameHotDog.trim()) return;

        axios.put(`/api/hotdogs`, {
            _id: this.props.element._id,
            name: this.state.newNameHotDog.replace(/\s+/g, ' ').trim(),
            description: this.state.description.replace(/\s+/g, ' ').trim()
        }).then(() => {
            this.props.toggleVisibleChangeForm();
            this.props.getList();
        })
    };

    render() {
        const { newNameHotDog, description } = this.state;
        const { toggleVisibleChangeForm } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                        className="change-hotdog-input" 
                        value={newNameHotDog}
                        onChange={this.handleChangeName} 
                        maxLength="90"/>
                <br/>
                <textarea className="change-hotdog-description" 
                        value={description}
                        onChange={this.handleChangeDescription} 
                        placeholder="description"
                        maxLength="255">
                </textarea>
                <br/>
                <input className="button-accept" 
                        type="submit" 
                        value="Change"/>
                <input className="button-cancel" 
                        type="reset" 
                        onClick={toggleVisibleChangeForm}
                        value="Cancel"/>
            </form>
        );
    }
}