import { Avatar, Input, List } from 'antd';
import { useEffect, useRef, useState } from "react";
import "./Counseling.css";

export const Analysis = _ => {
    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState("");
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [chatData]);

    const handleSendButtonClick = () => {
        if (message.trim() !== "") {
            setChatData((prevChatData) => [
                ...prevChatData,
                { id: prevChatData.length + 1, sender: '사용자', message: message },
            ]);
            setMessage("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSendButtonClick();
        }
    };

    return <>
        <h2>채팅 분석</h2>
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
        <hr />
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