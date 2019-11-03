import React from 'react';
import User from './User';


const List = ({users}) => {
  const list = users.map((user) => {
            return( <User key={user.id} id={user.id} name={user.name} />);
            });

      return(
          <div> {list} </div>
      );
}

export default List;
