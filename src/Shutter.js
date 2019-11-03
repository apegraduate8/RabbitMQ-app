import React from 'react';
import User from './components/User';
import List from './components/List';
import Input from './components/Input';
import Select from './components/Select';
import './App.css';

class Shutter extends React.Component {
    constructor() {
        super();
        this.options = [
        { value: 0, label: 'All' },
        { value: 1, label: 'Two accounts' },
        { value: 2, label: 'VIP account holders' }
      ];
    }

    state = {
      users: null,
      phrase: null,
      sequence: 0,
      message: null,
      detail: 'View users with more than 2 accounts! use the filter option in the top left of your screen'
    };

    componentDidMount () {
        this.getUsers();
    }

    /**
      * getUsers()
      * Fetches list of user with accounts
    */
    getUsers = async () => {
        const res = await fetch('http://localhost:8080/getUsers');
        const data = await res.json(); // also returns a promise

        this.setState({
            users: data,
            phrase: null,
            default: true,
        });
    }

    /**
      * handleChange()
      * Adds the chosen answers to answer object
      * @param {obj} e - event object
    */
    handleChange = (e) => {
        if (e.target.value == 0) {
          this.getUsers();
        }

        if (e.target.value == 1) {
          this.getAcctUsers()
        }

        if (e.target.value == 2) {
          this.getAcctUsers(true);
        }
    }

    /**
      * getAcctUsers()
      * fetches list users based on filter option
      * @param {boolen} vip - true or null depending on filter selection
    */
    getAcctUsers = async (vip) => {
        const apipath = vip ? 'getVipAcctUsers' : 'getAcctUsers';
        const res = await fetch('http://localhost:8080/' + apipath);
        const data = await res.json(); // also returns a promise

        this.setState({ users: data });
    }

    /**
      * validateText()
      * validates text input. Checks if special characters and digits are present in string
      * @param {string} s - input text
      * @param {obj} e - event object
    */
    validateText = (s, e) => {
        if (!s || s.match(/[!@#$%^&*(),.?":_+{}|<>|\d]/)) {
          e.preventDefault();

          return false;
        }

        return { name: s };
    }

    /**
      * sendUserInfo()
      * If text is valid, sends post data to api to add new user to list
      * @param {string} text - input text
      * @param {obj} e - event object
    */
    sendUserInfo = async (text, e) => {
        const validate = this.validateText(text, e);

        if (validate) {
            let res = await fetch('http://localhost:8080/setUser', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: validate })
            });
            if (res) {
                this.setState({ message: 'success' });
            }
        } else {
            this.setState({ message: 'incorrect format!' });
        }
    }

    render() {
        return (
            <div className='center'>
                <Select options={ this.options } onChange={ this.handleChange }/>
                { this.state.users ? <List users={ this.state.users } /> : '' }
                <p>{ this.state.phrase}</p>
                <span><i>{ this.state.detail }</i> </span>
                <Input onFormSubmit={ this.sendUserInfo }/>
                <p>{ this.state.message }</p>
            </div>
        );
    }
}

export default Shutter;


// ---- Reference
//https://www.telerik.com/blogs/dealing-with-cors-in-create-react-app
