import React from 'react';

const Select = ({ options, onChange }) => {
      const list = options.map((option) => {
                  return (<option key={ option.value } value={ option.value }>{ option.label }</option>);
                });
      return(
          <div style={{ width: '200px' }}>
              <div><label>Filter User Accts</label></div>
              <select onChange={ onChange }>{ list }</select>
          </div>
      );
}

export default Select;
