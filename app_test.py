from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse,FileResponse
from io import StringIO
import asyncio
import openai
import json
import os
import uvicorn
import boto3
from datetime import datetime
from botocore.exceptions import ClientError

app = FastAPI()

html = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Chat Test</title>
</head>
<body>
    <h1>WebSocket Chat Test</h1>
    
    <div>
        <h2>Chat History</h2>
        <div id="chatHistory"></div>
    </div>

    <div>
        <h2>Enter Message</h2>
        <input type="text" id="messageInput" placeholder="Enter message">
        <button id="sendButton">Send</button>
    </div>

    <script>
        const socket = new WebSocket("ws://ec2-3-34-181-29.ap-northeast-2.compute.amazonaws.com:8000/ws");
        const messageInput = document.getElementById("messageInput");
        const sendButton = document.getElementById("sendButton");
        const chatHistory = document.getElementById("chatHistory");

        socket.onopen = (event) => {
            chatHistory.innerHTML += "<p>WebSocket connection opened.</p>";
        };

        socket.onmessage = (event) => {
            const serverResponse = event.data; // Assuming the server sends JSON
            chatHistory.innerHTML += `<p>Server says: ${serverResponse}</p>`;
        };

        socket.onclose = (event) => {
            chatHistory.innerHTML += "<p>WebSocket connection closed.</p>";
        };

        sendButton.addEventListener("click", () => {
            const message = messageInput.value;
            socket.send(message);
            chatHistory.innerHTML += `<p>You say: ${message}</p>`;
            messageInput.value = ""; // Clear the input field after sending
        });
    </script>
</body>
</html>
'''

# Store active WebSocket connections
active_connections = []

# credentials, S3 bucket name -> 아래로 옮김! store manager 사용함

# File save - temporary
# Get the current datetime as a string
dt_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
result_file = f"conversation_results_{dt_time}.json"

### 대화 처리 로직 함수

# 대화 초기화
def reset_conversation():
    global conversation
    conversation = []
    print("대화가 초기화되었습니다.")

# 대화 시작 함수
def handle_conversation(user_input):
    global conversation
    conversation.append({"role": "user", "content": user_input})
    response = get_openai_response(conversation)
    print("모델 응답:")
    print(response["choices"][0]["message"]["content"])
    save_conversation_result(conversation, response)
    return response["choices"][0]["message"]["content"]

# OpenAI API로 대화 요청 함수
def get_openai_response(conversation):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation
    )
    return response

# 대화 결과 저장 함수
def save_conversation_result(conversation, response):
    result_data = {
        "conversation": conversation,
        "model_response": response["choices"][0]["message"]["content"]
    }
    with open(result_file, "a") as file:
        file.write(json.dumps(result_data) + "\n")

def generate_analysis_report(results):
    sentiment_counts = {}
    theme_counts = {}

    for result in results:
        conversation = result["conversation"]
        model_response = result["model_response"]

        # 대화에서 감정 및 주제 추출 및 카운팅
        # 이 부분은 각 대화별로 감정과 주제를 추출하고 카운트하는 로직을 추가해야 합니다.

    # 분석 리포트 생성
    analysis_report = {
        "sentiment-analysis": sentiment_counts,
        "themes": theme_counts
    }

    # 리포트를 JSON 파일로 저장
    with open(f"analysis_report_{dt_time}.json", "w") as report_file:
        json.dump(analysis_report, report_file, indent=4)

    # Initialize S3 client
    #local_file_path = 'C:\Users\eight\OneDrive\바탕 화면\LLMProject'
    #s3 = boto3.client('s3', aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_key)
    #s3_key = f'conversation_results_{dt_time}.json'
    #s3.upload_file(local_file_path, bucket_name, s3_key)

    #print(f'{local_file_path} uploaded to {bucket_name}/{s3_key}')


# Background task to check for idle connections and close them
async def check_idle_connections():
    while True:
        await asyncio.sleep(300)  # Check every 180 seconds
        
        for connection in active_connections:
            try:
                await connection.send_text("You've been idle for too long. Closing the connection.")
                await connection.close()
            except:
                pass



def get_secret():

    secret_name = "OpenAIapi"
    region_name = "ap-northeast-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    # Decrypts secret using the associated KMS key.
    secret = get_secret_value_response['SecretString']
    # Parse the JSON string
    secret_jsonify = json.loads(secret)
    print(secret_jsonify)

    # Extract the value associated with the "API_KEY" key
    api_key = secret_jsonify.get("OPENAI_API_KEY", None)
    print(api_key)
    return api_key


# Retrieve the API key from AWS Secrets Manager
OPENAI_API_KEY = get_secret()

if OPENAI_API_KEY:
    print(f"Retrieved API key: {OPENAI_API_KEY}")
else:
    print("Failed to retrieve the API key.") 
    print(OPENAI_API_KEY)

# credentials, S3 bucket name
bucket_name = 'cnackxml'
openai.api_key = OPENAI_API_KEY


### decorator 시작
@app.get("/")
async def get():
    return HTMLResponse(html)


# WebSocket route for the "/chat" endpoint
@app.websocket("/ws")
async def chat_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    
    try:
        # Reset the conversation when a WebSocket connection is established
        reset_conversation()
        
        while True:
            # Wait for user input
            user_input = await websocket.receive_text()
            
            if user_input == "close":
                await websocket.close()
                active_connections.remove(websocket)
                break
            
            # Call handle_conversation to process user input & Send the model's response back to the client
            model_response = handle_conversation(user_input)  # Assuming the model response is stored in the conversation
            await websocket.send_text(model_response)
            
            # Check if the user wants to end the conversation
            if user_input == "종료":
                break
    
    except asyncio.CancelledError:
        pass
    finally:
        active_connections.remove(websocket)

        # Finish the chat and generate the analysis report
        print("대화를 종료합니다.")
        #generate_analysis_report(conversation)  


# Report endpoint
@app.get("/report")
def get_report():
    with open(result_file, "r") as file:
        report_content = file.read()
    return report_content

# Start the background task
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(check_idle_connections())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



