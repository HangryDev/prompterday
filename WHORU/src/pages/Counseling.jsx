import { Avatar, Input, List } from 'antd';
import { useEffect, useRef, useState } from "react";
import "./Counseling.css";

export const Counseling = _ => {
    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [chatData]);

    useEffect(_ => {
        const initializeWebSocket = () => {
            const newSocket = new WebSocket("ws://ec2-3-34-181-29.ap-northeast-2.compute.amazonaws.com:8000/ws");
            newSocket.onopen = (event) => {
                console.log('WebSocket connection opened');
            };
            newSocket.onmessage = (event) => {
                const serverResponse = event.data;
                setChatData((prevChatData) => [
                    ...prevChatData,
                    { id: prevChatData.length + 1, sender: 'Bot', message: serverResponse },
                ]);
            };
            newSocket.onclose = (event) => {
                setTimeout(() => {
                    initializeWebSocket();
                }, 3000);
                console.log('WebSocket connection closed');
            };
            setSocket(newSocket);
        };
        initializeWebSocket();
    }, []);


    const handleSendButtonClick = () => {
        if (message.trim() !== "") {
            setChatData((prevChatData) => [
                ...prevChatData,
                { id: prevChatData.length + 1, sender: '사용자', message: message },
            ]);
            setMessage("");
            if (socket) {
                socket.send(message);
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSendButtonClick();
        }
    };

    return <>
        <div className="chat-list" ref={listRef}>
            <List
                itemLayout="horizontal"
                dataSource={chatData}
                renderItem={(item) => (
                    <List.Item className={`chat-bubble ${item.sender.toLowerCase()}`}>
                        <List.Item.Meta
                            avatar={<Avatar>{item.sender[0]}</Avatar>}
                            title={item.sender}
                            description={item.message}
                        />
                    </List.Item>
                )}
                locale={{ emptyText: '채팅을 시작해주세요' }}
            />
        </div>
        <div className="chat-input">
            <Input.TextArea
                value={message}
                onKeyDown={handleKeyDown}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                autoSize={{ minRows: 1, maxRows: 6 }}
            />
            <button className="send-button" onClick={handleSendButtonClick}>
                Send
            </button>
        </div>
    </>
}