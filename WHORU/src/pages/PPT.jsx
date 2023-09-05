import React, { useState } from 'react';
import { Layout, Typography, Form, Radio, Button, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './PPT.css';
import { Tile } from './Tile';

export const ProfessionalPsychologicalTest = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);

  const onFinish = (values) => {
    const selectedOption = values['psychologicalTest'];
    let testResult = '';

    switch (selectedOption) {
      case 'stressIndex':
        testResult = '스트레스 지수 측정: 85%';
        break;
      case 'selfAssessment':
        testResult = '자기 평가 및 자아 인식: 70%';
        break;
      case 'relationships':
        testResult = '관계 및 대인관계: 95%';
        break;
      default:
        testResult = '선택하지 않음';
    }

    setResult(testResult);
    message.success(`검사 결과: ${testResult}`);
  };

  return (
    <>
      <div className="form-container">
        <Form form={form} onFinish={onFinish}>
          <h2>AI 재무심리유형 검사</h2>
          <h3>심리 검사 주제 선택</h3>
          <Form.Item
            name="psychologicalTest"
            rules={[
              {
                required: true,
                message: '하나를 선택하세요.',
              },
            ]}
          >
            <Radio.Group>
              <Radio value="stressIndex">스트레스 지수 측정</Radio>
              <Radio value="selfAssessment">자기 평가 및 자아 인식</Radio>
              <Radio value="relationships">관계 및 대인관계</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SmileOutlined />}
              className="submit-button"
            >
              검사 시작 (구현 예정)
            </Button>
          </Form.Item>
        </Form>
        {result && (
          <div className="result">
            <h3 level={3} className="result-title">
            지난 검사 결과 보기
            </h3>
            <Tile />
            {/* <Paragraph className="result-text">{result}</Paragraph> */}
          </div>
        )}
      </div>
    </>
  );
};