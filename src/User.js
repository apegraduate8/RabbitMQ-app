import React from 'react';


const User = ({id, name}) => {
      return(
          <div style={{borderBottom: 'solid black'}}>
              <p> ID: {id}</p>
              <p> Name: {name}</p>
          </div>
      );
}

export default User;
