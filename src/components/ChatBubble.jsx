import React from 'react';
import Firebase from 'firebase';

export class ChatBubble extends React.Component {
    render() {
        const {message} = this.props;

        return (
            <span style={chatBubbleStyle}>
                <div>
                  <OrderDetail order={message}/>
                </div>
                <button>Onayla</button>
                <button>Hazır</button>
            </span>
        );
    }
}

export class OrderDetail extends React.Component {
    render() {
        const {order} = this.props;

        var order_details = []

        for(var i = 0; i < order.order_items.length; i++) {
          order_details.push(<ItemDetail itemID={order.order_items[i]}/>)
          if(order.order_specifications[i]) {
            for(var j = 0; j < order.order_specifications[i].length; j++) {
                        order_details.push(order.order_specifications[i][j] + "<br>")
            }
          }
        }
        return (
            <div>
                {
                  order_details
                }
            </div>
        );
    }
}

export class ItemDetail extends React.Component {
    render() {
        const {itemID} = this.props;

        Firebase.database().ref("/items").once('value', (value) => {
            
            var item = value.val()
            
            return (
              <div>
                  {
                    item.item_name
                  }
              </div>
            );
        });
    }
}

const chatBubbleStyle = {
    border: '2px #e28e06 solid',
    borderRadius: '10px',
    display: 'inline-block',
    backgroundColor: 'white',
    position: 'relative',
    marginBottom: '10px',
    padding: '20px'
};

const messageStyle = {
    fontSize: '20px',
    color: 'black'
};

const fromStyle = {
    fontSize: '12px',
    color: 'black'
};