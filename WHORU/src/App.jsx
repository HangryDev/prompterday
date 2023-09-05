import { CheckCircleOutlined, UploadOutlined, UserOutlined, MailOutlined, EditOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Counseling } from './pages/Counseling';
import { MyHistory } from './pages/MyHistory';
import { Analysis } from './pages/Analysis';
import { Tile } from './pages/Tile';
import { ShortForm } from './pages/ShortForm';
import { PersonaTalk } from './pages/PersonaTalk';
import { ProfessionalPsychologicalTest } from './pages/PPT';
import { InMindSearch } from './pages/Inmind';

const { Header, Content } = Layout;

function App() {
  const currentHash = window.location.hash === '' ? '/' : window.location.hash.slice(1);

  const [selectedMenuKey, setSelectedMenuKey] = useState(currentHash || 'home');

  const handleMenuSelect = (e) => {
    const selectedKey = e.key;
    setSelectedMenuKey(selectedKey);

  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
        <Header className="nav-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="app-logo">쓰니</h1>
          <Menu theme="light" mode="horizontal" selectedKeys={[selectedMenuKey]} onSelect={handleMenuSelect} disabledOverflow={true}>
            <Menu.Item key="/" icon={<CheckSquareOutlined />}>
              <Link to="/">All Menu</Link>
            </Menu.Item>
            <Menu.Item key="/short-form" icon={<EditOutlined />}>
              <Link to="/short-form">숏폼 작성하기</Link>
            </Menu.Item>
            <Menu.Item key="/persona-talk" icon={<UserOutlined />}>
              <Link to="/persona-talk">페르소나 톡</Link>
            </Menu.Item>
            <Menu.Item key="/counseling" icon={<UserOutlined />}>
              <Link to="/counseling">전문 심리 검사</Link>
            </Menu.Item>
            <Menu.Item key="/in-mind-search" icon={<CheckCircleOutlined />}>
              <Link to="/in-mind-search">인마인드 탐색</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="chat-container">
            <Routes>
              <Route path="/" element={<Tile />} />
              <Route path="/counseling" element={<ProfessionalPsychologicalTest />} />
              <Route path="/in-mind-search" element={<InMindSearch />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/short-form" element={<ShortForm />} />
              <Route path="/persona-talk" element={<PersonaTalk />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
