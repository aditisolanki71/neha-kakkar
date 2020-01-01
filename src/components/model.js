import React from 'react';
import './model.css';

class Modal extends React.Component{
      render(){
        if(!this.props.show) {
            return null;
          }
          return(
              
            <div className="backdrop">
                <div className="model">
                 
                        <p>name</p>
                        <p>{this.props.poke.name}</p>
                 
                </div>

                <div className="footer">
                    <button onClick={this.props.onClose}>close</button>
                </div>
            </div>
          );
      }   
}

export default Modal;