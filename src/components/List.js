import React from 'react';
import User from './User';

const List = ({ users, checkIsomorphic }) => {
    let store = [];
    let elements = [];

    const storeName = (target) => {
        if(store.includes(target.dataset.name)) return false;

        store.push(target.dataset.name);
        elements.push(target);

        if (store.length === 2) {
            checkIsomorphic(store)
            elements.map(el => el.classList.toggle("active"));
            store = [];
            elements = [];
        }
    }

    const list = users.map((user) => {
            return(<User key={ user.id } id={ user.id } name={ user.name } storeName={ storeName } />);
            });

    return(<div>{ list }</div>);
}

export default List;
