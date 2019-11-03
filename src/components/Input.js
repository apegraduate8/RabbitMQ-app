import React from 'react';
import '../App.css';

class Input extends React.Component {
  state = { text: '' };

  onInputChange = (event) => {
      this.setState({ text: event.target.value });
  };

  /**
    * onFormSubmit()
    * On form submit, Invokes callback from parent component
    * @param {obj} e - event object
  */
  onFormSubmit = (e) => {
      this.props.onFormSubmit(this.state.text, e);
  };

  render() {
    return(
      <div className="space">
          <span><b> PLEASE ENTER A NAME. EXAMPLE: 'Anthony'</b></span> <br />
          <span><i> no special characters or digits</i> </span>
          <div className="space">
              <form onSubmit={ this.onFormSubmit }>
                  <label>Add user</label>
                  <input
                      value={ this.state.text }
                      type="text"
                      onChange={ this.onInputChange }
                  />
                  <button> submit</button>
              </form>
          </div>
      </div>
    );
  }
}

export default Input;
