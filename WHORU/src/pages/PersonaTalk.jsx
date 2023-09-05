import { Layout, Menu, Typography } from 'antd';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Counseling } from './Counseling';
import './PersonaTalk.css';

const { Content, Sider } = Layout;
const { Title } = Typography;

export const PersonaTalk = () => {
  return (
    <Layout>
      <Sider width={200} theme="light">
        <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">페르소나 1</Menu.Item>
          <Menu.Item key="2">페르소나 2</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content  >
          <div className="content-container">
            <div className="chat-container2">
              <h2 className='chat-title'>
                페르소나 톡
              </h2>
              {/* <h3 className='chat-title'>나를 닮은 페르소나 ai를 대화로 만들어 보세요!</h3> */}
              <Counseling />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};