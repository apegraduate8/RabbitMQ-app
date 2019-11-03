import React from 'react';
import User from './User';
import List from './List';
import Input from './Input';
import Select from './components/Select';
import './App.css';

class Shutter extends React.Component {
    constructor() {
        super();
        this.options = [
        {value: 0, label: 'All'},
        {value: 1, label: 'Two accounts',},
        {value: 2, label: 'VIP account holders'}
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

    getUsers = async () => {
        const res = await fetch('http://localhost:8080/getUsers');
        const data = await res.json(); // also returns a promise

        this.setState({
            users: data,
            phrase: null,
            default: true,
        });
    }

    handleChange = (selectedOption) => {
        if (selectedOption.target.value == 0) {
          this.getUsers();
        }

        if (selectedOption.target.value == 1) {
          this.getAcctUsers()
        }

        if (selectedOption.target.value == 2) {
          this.getAcctUsers(true);
        }
    }

    getAcctUsers = async (vip) => {
        const apipath = vip ? 'getVipAcctUsers' : 'getAcctUsers';
        const res = await fetch('http://localhost:8080/' + apipath);
        const data = await res.json(); // also returns a promise

        this.setState({
            users: data,
        });
    }

    validateText = (s, e) => {
        if (!s || s.match(/[!@#$%^&*(),.?":_+{}|<>|\d]/)) {
          e.preventDefault();

          return false;
        }

        return { name: s};
    }

    sendUserInfo = async (text, e) => {
        // validate text
        let validate = this.validateText(text, e);

        if (validate) {
            let res = await fetch('http://localhost:8080/setUser', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: validate})
            });
            if (res) {
                this.setState({message: 'success'});
            }
        } else {
            this.setState({message: 'incorrect format!'});
        }
    }

    render() {
        return (
            <div className='center'>
              <Select options={this.options} onChange={this.handleChange}/>
              {this.state.users ? <List users={this.state.users} /> : ''}
              <p>{this.state.phrase}</p>
              <span><i>{this.state.detail}</i> </span>
              <Input onFormSubmit={this.sendUserInfo}/>
              <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Shutter;


// ---- Reference
//https://www.telerik.com/blogs/dealing-with-cors-in-create-react-app
