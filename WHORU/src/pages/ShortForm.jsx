import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import './ShortForm.css'

export const ShortForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const onFinish = (values) => {
    console.log('숏폼 데이터:', values);
    setFormData(values); // 폼 데이터를 상태에 저장
  };

  const handleSave = () => {
    // 폼 데이터를 저장하거나 서버로 전송하는 로직을 추가할 수 있음
    console.log('폼 데이터를 저장합니다:', formData);
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
          <Input.TextArea className="form-input" rows={4} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              제출
            </Button>
            <Button type="default" onClick={handleSave}>
              저장
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};