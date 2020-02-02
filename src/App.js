import React, { Component } from 'react';
import Firebase from 'firebase';
import { ChatBubble } from './components/ChatBubble';

class App extends Component {
    db = Firebase.database();
    messageRef = this.db.ref('/orders');

    state = {
        newMessage : '',
        incompleteOrders: [],
        completeOrders: [],
        usernameInput: '',
        username: null
    };

    async componentWillMount() {
      this.messageRef.orderByChild('order_restaurant')
          .equalTo("83h4h2u3").on('value', (value) => {

            // SEPARATE THE COMPLETE AND INCOMPLETE ORDERS
            var orders = Object.values(value.val())
            console.log(orders)
            var incomplete_orders = []
            var complete_orders = []
            for(var i = 0; i < orders.length; i++) {
              var order = orders[i]
              var order_state = order["order_state"].length - 1
              if(order_state == 0) {
                incomplete_orders.push(order)
              } else {
                complete_orders.push(order)
              }
            }
            this.setState({incompleteOrders: incomplete_orders, completeOrders: complete_orders});
        });

    }

    componentDidMount() {
        window.anchor = this.anchor;
        this.anchor.scrollIntoView({behavior: 'smooth'});
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    //

    renderMessageArea = () => {
        const {completeOrders} = this.state;

        return (
            <div style={messageAreaStyle}>
                {
                    completeOrders && Object.keys(completeOrders).map(key => {
                        return (
                            <div key={key}>
                                <ChatBubble message={completeOrders[key]}/>
                            </div>
                        )
                    })
                }
                <div
                        style={{ float:"left", clear: "both" }}
                        ref={(anchor) => this.anchor = anchor}
                />
            </div>
        );
    }

    sendMessage = () => {
        const {username, newMessage} = this.state;

        this.messageRef.push({from: username, message: newMessage});
        this.anchor.scrollIntoView({behavior: 'smooth'});
        this.setState({newMessage: ''});
    }

    render() {
        return (
            <div style={containerStyle}>
                {this.renderMessageArea()}
            </div>
        );
    }
}

const containerStyle = {
    fontFamily: 'Open Sans',
    backgroundColor: '#efefef',
    width: '100%',
    height: '100%',
    position: 'fixed'
};

const messageAreaStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef',
    padding: '20px',
    overflowY: 'auto',
    marginBottom: '200px'
};

const usernameFormStyle = {
    zIndex: 100,
    position: 'fixed',
    backgroundColor: '#efefef',
    width: '100%',
    height: '100%',
    padding: '30px 15px',
    textAlign: 'center'
};

const usernameTextInputStyle = {
    borderRadius: '3px',
    padding: '5px 10px',
    border: '2px #f4b042 solid',
    outline: 'none',
    fontSize: '20px',
    fontFamily: 'Open Sans'
}

const buttonStyle = {
    backgroundColor: '#f4b042',
    color: 'white',
    border: '2px #e28e06 solid',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    padding: '8px 12px'
}

const inputStripStyle = {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    backgroundColor: '#fefefe',
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
}

const causeCodeLogoUrl = 'https://image4.owler.com/logo/causecode-technologies_owler_20161118_153539_large.png';

export default App;
