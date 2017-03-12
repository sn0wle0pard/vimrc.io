import React from 'react';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/styles';
require('./Preview.scss');

class Preview extends React.Component {
  
  render(){
    
    const createCode = data => {
      let hlcode = '';
      for(let category in data) {
        for(let subcategory in data[category]) {
          data[category][subcategory].map((option, i) => {
            let value = this.props.value[option.name];
            let code;
            let defaultValue = (typeof option.default.global !== "undefined") ? 
              option.default.global : option.default[this.props.os];
            if (!value || value === defaultValue || value === ""){
              code = '';
            } else {
              switch(option.type){
                case 'number':
                case 'select':
                  code = `set ${option.name}=${value}\n`;
                  break;
                case 'checkbox':
                  if (value) {
                    code = `set ${option.name}\n`;
                    break;
                  }
                  code = `set no${option.name}\n`;
                  break;
                default:
                  code = '';
                  break;
              }
            }
            hlcode += code;
          });
        }
      }
      return hlcode;
    };

    return(
      <SyntaxHighlighter language='vim' style={gruvboxDark} showLineNumbers={true}>
        {createCode(this.props.data)}
      </SyntaxHighlighter>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.option.list.data,
    value: state.option.value,
    os: state.option.os
  };
};

export default connect(mapStateToProps)(Preview);
