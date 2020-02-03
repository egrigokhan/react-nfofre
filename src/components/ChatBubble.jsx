import React from 'react';
import Firebase from 'firebase';

export class ChatBubble extends React.Component {

        updateOrderState = (order, e) => {

          var date = (new Date().getTime()/1000);
          date = parseInt(date, 10)

          var order_state = order.order_state

          order_state.push(date)

          Firebase.database().ref('orders/' + order.order_database_id + "/order_state").set(
            order_state
          );
        }

        orderConfirmed = (message, e) => {
          console.log("ORDER CONFIRMED");
          console.log(message.order_database_id)
          this.updateOrderState(message, e)
        }

        orderReady = (message, e) => {
          console.log("ORDER READY");
          console.log(message.order_database_id)
          this.updateOrderState(message, e)
        }

    render() {
        const {message} = this.props;

        return (
            <span style={chatBubbleStyle}>
                <div>
                  <OrderDetail order={message}/>
                </div>
                <button onClick={(e) => this.orderConfirmed(message, e)}>Onayla</button>
                <button onClick={(e) => this.orderReady(message, e)}>Hazır</button>
            </span>
        );
    }
}

export class OrderDetail extends React.Component {
    render() {
        const {order} = this.props;

        var order_details = []

        var order_description_items = order.order_description["order_description_items"]
        var order_description_specifications = order.order_description["order_description_specifications"]

        for(var i = 0; i < order_description_items.length; i++) {
          order_details.push(<ItemDetail itemID={order_description_items[i]}/>)
          if(order_description_specifications[i]) {
            for(var j = 0; j < order_description_specifications[i].length; j++) {
                        order_details.push(<SpecificationDetail specificationID={order_description_specifications[i][j]}/>)
            }
          }
        }
        return (
            <div style={messageStyle}>
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

        return (
              <div>
                  {
                    itemID
                  }
              </div>
            );
    }
}

export class SpecificationDetail extends React.Component {
    render() {
        const {specificationID} = this.props;

        return (
              <div style={specificationDetailStyle}>
                  {
                    specificationID
                  }
              </div>
            );
    }
}

const chatBubbleStyle = {
    minWidth: "40%",
    border: '2px purple solid',
    borderRadius: '10px',
    display: 'inline-block',
    backgroundColor: 'white',
    position: 'relative',
    marginBottom: '10px',
    padding: '20px'
};

const messageStyle = {
    fontSize: '12px',
    fontWeight: 'bolder',
    color: 'black'
};

const specificationDetailStyle = {
    marginLeft: '20px'
};

const fromStyle = {
    fontSize: '12px',
    color: 'black'
};