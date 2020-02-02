import React from 'react';

export class ChatBubble extends React.Component {
    render() {
        const {message} = this.props;

        return (
            <span style={chatBubbleStyle}>
                <div style={fromStyle}>
                    <b>{message.order_user}</b> says:
                </div>
                <div style={messageStyle}>
                    {message.order_items}
                </div>
                <button>Onayla</button>
                <button>Hazır</button>
            </span>
        );
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