import React from 'react';
import '../App.css';

class User extends React.Component {
    captureName = (e) => {
        e.stopPropagation();
        const target = e.target;

        if (!target.classList.contains("active")) {
            this.props.storeName(e.target);
        }

        target.classList.toggle("active");
    };

    render() {
        const { id, name } = this.props;

        return(
            <div style={{ borderBottom: 'solid black' }}>
                <div style={{ width: '20px', height: '20px', border: 'solid black', float: 'right'}}
                    onClick={this.captureName}
                    data-name={ name }>
                </div>
                <p>ID: { id }</p>
                <p>Name: { name }</p>
            </div>
        );
    }

}

export default User;
