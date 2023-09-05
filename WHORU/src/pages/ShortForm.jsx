import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import './ShortForm.css';

export const ShortForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [resultVisible, setResultVisible] = useState(false); // 결과물 표시 여부
  const [analysisResults, setAnalysisResults] = useState({
    // 초기 결과물 값
    emotionAnalysis: {},
    storyAnalysis: {},
    psychologicalAnalysis: {},
  });

  const onFinish = (values) => {
    setFormData(values); // 폼 데이터를 상태에 저장

    setAnalysisResults({
      emotionAnalysis: {
        "unique_sentiments": ["설레는", "감동적인", "슬픈", "그리움", "안타까운"],
        "unique_topic": ["일상", "음악", "가족"],
        "sentiments_count": [
            {"감정": "설레는", "개수": 1},
            {"감정": "감동적인", "개수": 1},
            {"감정": "슬픈", "개수": 1},
            {"감정": "그리움", "개수": 1},
            {"감정": "안타까운", "개수": 1}
        ],
        "most_thoughts": ["산다는게 다 그런거지. 누구나 빈손으로 와. 소설같은 한 편의 얘기들을 세상에 뿌리고 살지.", "누구나 빈손으로 온다는 이야기, 그리고 자기 만의 인생을 세상에 뿌리고 산다는 표현이 낯설게 느껴졌다.", "동료의 어머니도 빈손으로 오셨을 텐데, 무엇을 가져가실까? 어머니의 인생은 어떤 소설이었을까. 그리고 어떻게 세상에 뿌리면서 사셨을까?", "그리고 그런 삶에서 (나의 회사 동료를 포함하여) 주변 많은 사람들에게 자기 자신이 줄 수 있는 것들을 많이 주면서 사셨을 것이다. 긍정적이고 부정적인 감정 표현부터 시작해, 따뜻하고 차가운 말도 뿌리셨을 거다. 누군가의 삶에 영향을 끼칠 음식들도, 선물들로도 자신의 ‘소설 같은 삶’ 을 보여주려 하셨겠다."],
        "main_challenge": ["어쩜 이런 가사를 쓸까 싶어 마음속 환호성도 질렀다.", "그게 설령 오른쪽과 왼쪽 골반의 불균형이더라도 말이다. 오른쪽으로 돌아 사람들을 마주할 일들이 많았다는 걸 뜻할테니 말이다.", "그 격차도 느끼고 사셨을지 아닐지도 괜시리 궁금해졌었다."]
    },
      storyAnalysis: {
        'character': {
            '송해 선생님': '송해 선생님 대신 김신영이 MC를 맡아 진행하는 걸 알리듯 한쪽 그의 얼굴이 한쪽에 크게 프린트되어있었다.',
            '가수 김연자': '가장 처음에 있던 사람의 얼굴이 가수 김연자였다.'
        },
        'relationship': {
            '김신영': 'MC를 맡아 진행하는',
            '김연자': '가장 처음에 있던 사람'
        },
        'action_story': {
            '아모르 파티 노래를 틀었다.': ['오랜만에 들으니 가사가 더 선명하게 들어왔다.', '‘아모르파티’ 라는 가사가 나오기만을 기다리곤 했는데 이번은 좀 달랐다.'],
            '하루를 보내다, 회사 동료의 어머니 부고 소식을 들었다.': ['동료의 어머니도 빈손으로 오셨을 텐데, 무엇을 가져가실까?', '어머니의 인생은 어떤 소설이었을까. 그리고 어떻게 세상에 뿌리면서 사셨을까?']
        },
        'difficulty': {
            '회사 동료의 어머니 부고 소식을 들었다.': '동료의 어머니의 죽음에 대한 어려움과 그에 대한 이해와 공감을 겪을 것이다.'
        },
        'topic_list': {
            '주제': '삶을 살아가는 의미와 가치에 대한 탐구'
        },
        'next_topics': {
            '주제1': '인생의 의미와 목표에 대한 고찰',
            '주제2': '자기 자신과 주변 사람들에게 주는 것의 중요성',
            '주제3': '가족과 유대관계의 의미와 가치'
        }
    },
      psychologicalAnalysis: {"result": {
        "q1": {"item": "개인 정보", "answer": "성별: 불명, 나이: 20대, 교육: 불명, 거주 상황: 불명, 종교: 불명"},
        "q2": {"item": "상담 요청 맥락", "answer": "글쓴이는 상담을 받지 않았으며, 상담이 필요한 이유나 외부 압력에 대한 언급이 없음"},
        "q3": {"item": "주요 걱정 사항", "answer": "글쓴이의 주요 걱정 사항은 언급되지 않음"},
        "q4": {"item": "이전 상담 경험", "answer": "글쓴이는 이전에 상담을 받은 경험이 없습니다."},
        "q5": {"item": "글쓴이의 가족 관계", "answer": "글쓴이는 가족 구성원에 대한 정보를 제공하지 않았습니다."},
        "q6": {"item": "글쓴이의 강점과 자원", "answer": "글쓴이의 강점과 자원에 대한 정보를 제공하지 않았습니다."},
        "q7": {"item": "글쓴이의 걱정에 대한 대처", "answer": "글쓴이의 현재 걱정 사항의 기원과 대처 방법에 대한 정보를 제공하지 않았습니다."}
    }},
      // 다른 분석 결과도 추가
    });

    setResultVisible(true); // 결과물을 표시
  };

  return (
    <div className="short-form-container">
      <h1 className="form-title">숏폼 작성하기</h1>
      <Form form={form} onFinish={onFinish} className="form">
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: '제목을 입력해주세요.' }]}
        >
          <Input className="form-input" />
        </Form.Item>
        <Form.Item
          label="내용"
          name="content"
          rules={[{ required: true, message: '내용을 입력해주세요.' }]}
        >
          <Input.TextArea className="form-input" rows={20} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              제출
            </Button>
          </Space>
        </Form.Item>
      </Form>

      {/* 결과물을 표시하는 부분 */}
      {resultVisible && (
        <div>
          <h2>1. 글쓴이 감정 분석 결과</h2>
          <pre>{JSON.stringify(analysisResults.emotionAnalysis, null, 2)}</pre>

          <h2>2. 글쓴이 스토리 분석 결과</h2>
          <pre>{JSON.stringify(analysisResults.storyAnalysis, null, 2)}</pre>

          <h2>3. 심리 검사 분석 프롬프트</h2>
          <pre>{JSON.stringify(analysisResults.psychologicalAnalysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
