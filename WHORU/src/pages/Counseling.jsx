import { Avatar, Input, List } from 'antd';
import { useEffect, useRef, useState } from "react";
import "./Counseling.css";

// const reservedMessage = {
//     position: 0,
//     list: [
//         '안녕하세요! 이야기를 시작하기 전에, 어떤 주제에 대해 이야기를 나누고 싶으신가요? 예를 들어, 가족, 친구, 취미, 일상 생활 등 다양한 주제 중에서 선택해주세요. 그러면 그 주제에 관련된 이야기를 가볍게 시작해보겠습니다.',
//         '엄마에 대한 생각이 많이 드는군요. 엄마에 대해 좀 더 자세히 이야기해주실 수 있을까요? 어떤 면에서 엄마에 대한 생각이 드는지, 어떤 감정을 느끼는지 알려주세요. 그러면 그에 대해 더 깊이 이야기해볼 수 있을 것 같습니다.',
//         '엄마를 많이 보고 싶다는 감정이 느껴진다는군요. 그렇다면 엄마를 보고 싶어하는 이유가 무엇인지 알려주실 수 있을까요? 엄마와의 관계나 엄마에 대한 특별한 추억이 있을 수도 있습니다. 그리고 엄마를 보고 싶을 때 어떤 감정을 느끼는지도 함께 알려주세요. 이러한 감정과 이유에 대해 이야기해보면, 엄마에 대한 더 깊은 이해를 얻을 수 있을 것 같습니다.',
//         '엄마를 많이 보고 싶다는 감정이 여전히 느껴진다는군요. 이러한 감정을 느끼는 이유가 무엇인지 알려주실 수 있을까요? 엄마와의 관계나 엄마에 대한 특별한 추억이 있을 수도 있습니다. 또한, 엄마를 보고 싶을 때 어떤 감정을 느끼는지도 함께 알려주세요. 이러한 감정과 이유에 대해 이야기해보면, 엄마에 대한 더 깊은 이해를 얻을 수 있을 것 같습니다.',
//         '저런, 저는 그 사실을 몰랐었군요. 엄마가 돌아가신 지 3개월 정도 되었다니 정말 어려운 시간을 보내고 계시겠군요. 이러한 상황에서 엄마를 많이 보고 싶어하는 감정은 당연한 일입니다. 엄마와의 연결과 추억이 아직도 많이 생각나고 그리워하시는 것 같습니다. 이러한 감정을 느낄 때 어떤 감정을 느끼시는지 알려주실 수 있을까요? 그리고 엄마와의 특별한 순간이나 추억이 있으신가요? 이러한 이야기를 통해 엄마에 대한 감정과 추억을 공유해보면, 이해와 위로를 받을 수 있을 것입니다.',
//         '일상을 살아야 한다는 생각을 많이 하시는군요. 엄마가 돌아가셨지만 여전히 자신의 삶이 있기 때문에 그렇게 생각하시는 것 같습니다. 그럼에도 불구하고, 가끔은 친구들과 이야기를 나누다가 그들의 이야기 속에 엄마라는 단어가 나오면 마음이 조금 가라앉는다고 말씀하셨네요. 이러한 감정은 자연스러운 일입니다. 엄마와의 연결과 추억이 아직도 당신의 마음에 깊게 남아있기 때문에 그런 감정이 드는 것이라고 생각됩니다. 이러한 감정을 느낄 때 어떤 감정을 느끼시는지 더 자세히 알려주실 수 있을까요? 그리고 그런 감정이 들었을 때 어떻게 대처하시는지 궁금합니다. 이러한 이야기를 통해 당신의 감정과 대처 방법을 이해해보고자 합니다.',
//         '그 감정을 느낄 때는 그대로 두시는 것이 좋은 방법이라고 생각합니다. 엄마를 그리워하고 아버지를 걱정하는 마음이 드는 것은 당연한 일입니다. 엄마가 돌아가셨기 때문에 아버지의 상태와 생활에 대한 걱정이 생기는 것이 자연스러운 일입니다. 아버지가 잘 지내고 있는지, 식사를 잘 하고 있는지에 대한 우려가 있으신 것 같습니다. 이러한 마음을 가지고 계시면서 아버지와 소통하고 지원하는 방법을 찾아보는 것이 중요합니다. 아버지와의 대화나 관심을 통해 그 마음을 조금이나마 더 안정시킬 수 있을 것입니다. 또한, 자신의 감정을 솔직하게 표현하고 공유하는 것도 도움이 될 수 있습니다. 이러한 과정을 통해 당신의 마음과 아버지와의 관계를 조금 더 발전시킬 수 있을 것입니다.',
//         '그렇게 결정하셨군요. 자신의 감정을 솔직하게 표현하고 아버지와 소통하는 것은 중요한 일입니다. 이를 통해 당신의 마음과 아버지와의 관계를 조금 더 발전시킬 수 있을 것입니다. 어떤 방식으로 소통하고 지원할지에 대해 생각해보시고, 필요한 경우에는 친구들이나 가까운 사람들과도 이야기를 나누는 것도 도움이 될 수 있습니다. 엄마의 돌아가신 것은 큰 상실이지만, 여전히 가족과 소중한 사람들이 당신을 둘러싸고 있습니다. 이를 기억하고, 자신의 감정을 존중하며 건강하게 지내시길 바랍니다. 어떤 주제로 이야기를 이어가고 싶으신가요?',
//         `엄마에 대한 생각이 자꾸 든다는 것은 자연스러운 일입니다. 엄마에 대한 특별한 추억이나 감정을 소중히 여기고, 그를 기리는 방법을 찾는 것이 좋을 것 같습니다. 엄마와의 연결을 유지하기 위해 다음과 같은 활동을 고려해볼 수 있습니다:

//         1. 추억을 회상해보기: 엄마와 함께한 특별한 순간이나 추억을 회상해보는 것은 엄마를 기억하고 그리워하는 마음을 달래는 데 도움이 될 수 있습니다. 앨범이나 사진을 보며 그때의 감정을 떠올려보세요.
//         2. 편지나 일기 쓰기: 엄마에게 편지를 쓰거나, 엄마에 대한 일기를 써보는 것도 좋은 방법입니다. 마음을 담아 엄마에게 전하는 것이 엄마와의 연결을 느끼는 데 도움이 될 수 있습니다.
//         3. 엄마와의 관련된 활동 참여: 엄마와의 관련된 활동에 참여하면서 엄마를 기리는 것도 좋은 방법입니다. 예를 들어, 엄마가 좋아했던 취미나 요리를 해보거나, 엄마와 함께 했던 장소를 방문해보는 것도 좋은 아이디어입니다.
//         4. 엄마와 이야기하기: 엄마에 대한 생각이 들 때, 엄마와 대화하는 것도 도움이 될 수 있습니다. 엄마에게 말하고 싶은 이야기나 소중한 마음을 엄마에게 전해보세요. 이를 통해 마음의 안정과 위로를 받을 수 있을 것입니다.
        
//         이러한 방법들을 통해 엄마에 대한 감정을 표현하고, 그를 기리며 마음을 달래보세요. 어떤 활동을 선택하시겠습니까?`,
//         '좋은 선택입니다. 글을 쓰는 것은 엄마에 대한 감정을 표현하고 마음을 정리하는 좋은 방법입니다. 엄마에게 편지를 쓰거나, 엄마에 대한 일기를 써보는 것을 고려해보세요. 이를 통해 엄마에게 전하고 싶은 이야기나 소중한 마음을 담아보세요. 엄마와의 연결을 느끼며 마음을 표현하는 과정에서 안정과 위로를 받을 수 있을 것입니다.'
//     ]
// }


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
                if(serverResponse !== "You've been idle for too long. Closing the connection.") {
                    setChatData((prevChatData) => [
                        ...prevChatData,
                        { id: prevChatData.length + 1, sender: 'Bot', message: serverResponse },
                    ]);
                }
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
            // if (reservedMessage.position+1 === reservedMessage.list.length) {
            //     setChatData((prevChatData) => [
            //         ...prevChatData,
            //         { id: prevChatData.length + 1, sender: '사용자', message: message },
            //         { id: prevChatData.length + 2, sender: 'Bot', message: reservedMessage.list[reservedMessage.position++] },
            //     ]);

            //     setTimeout(_ => {
            //         setChatData((prevChatData) => [
            //             ...prevChatData,
            //             {
            //                 id: prevChatData.length + 1, sender: 'Bot', message: `ressult = {
            //             '사실요약': [['엄마가 돌아가신지 3개월 정도 됐어요', '일상을 살아야 겠다는 생각을 가장 많이 하긴 해요', '가끔은 친구들과 이야기를 하다 그들의 이야기 속에 엄마라는 단어가 나오면', '집에 있는 아버지를 생각하면 속상하기도 하고요']],
            //             '감정요약': [['보고싶음', '마음이 가라앉음', '속상함']],
            //             '주제요약': [['주제: '엄마의 돌아감에 대한 감정과 아버지에 대한 걱정']]` },
            //         ])
            //     }, 3000)
            // } else {
                setChatData((prevChatData) => [
                    ...prevChatData,
                    { id: prevChatData.length + 1, sender: '사용자', message: message },
                    // { id: prevChatData.length + 2, sender: 'Bot', message: reservedMessage.list[reservedMessage.position++] },
                ]);
            // }
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