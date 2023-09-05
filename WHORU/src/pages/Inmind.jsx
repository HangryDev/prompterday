import React, { useState } from 'react';
import { Layout, Input, Button, List, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './InMindSearch.css';
import { Avatar, Card } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

export const InMindSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // 여기에서 실제 검색 로직을 추가합니다.
        // 검색 결과는 setSearchResults를 통해 설정합니다.
        // 이 예제에서는 가상 데이터를 사용하여 결과를 설정합니다.
        const results = [
            '내면의 평화 찾기: 명상과 정서 조절',
            '스트레스 해소와 내면의 조화',
            '자기 발견과 내면의 안정성',
            '심리 상담과 내면의 성장',
            '정신 건강과 내면의 조화',
        ];
        setSearchResults(results);
    };

    return (
        <>
            <h2>인마인드 탐색</h2>
            <Content className="content">
                <h3>오늘의 인마인드 컨텐츠 추천</h3>
                <div className="results-container">
                    <Card
                        hoverable
                        style={{ width: 400, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                        cover={<img alt="예시 이미지" className="card-image3" src="/inmind/1.png" />}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 400, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                        cover={<img alt="예시 이미지" className="card-image3" src="/inmind/2.png" />}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 400, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                        cover={<img alt="예시 이미지" className="card-image3" src="/inmind/3.png" />}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 400, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                        cover={<img alt="예시 이미지" className="card-image3" src="/inmind/4.png" />}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 400, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                        cover={<img alt="예시 이미지" className="card-image3" src="/inmind/5.png" />}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 400, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                        cover={<img alt="예시 이미지" className="card-image3" src="/inmind/6.png" />}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </div>
                <div className="search-container">
                    <Input
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearch}
                    >
                        검색
                    </Button>
                </div>
            </Content>
        </>
    );
};
