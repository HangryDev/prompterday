import { Card } from 'antd';
import "./Tile.css"

export function Tile() {
    return (
        <div className="App">
            <h2>All Menu</h2>
            <div className="card-container">
                <Card
                    hoverable
                    style={{ width: 250, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                    cover={<img alt="예시 이미지" className="card-image2" src="/photo-1508780709619-79562169bc64.jpg" />}
                >
                    <div className="text-overlay">
                        <h2>숏폼쓰기</h2>
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 250, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                    cover={<img alt="예시 이미지" className="card-image2" src="/multiethnic-women-chatting-home.jpg" />}
                >
                    <div className="text-overlay">
                        <h2>페르소나 톡</h2>
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 250, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                    cover={<img alt="예시 이미지" className="card-image2" src="/priscilla-du-preez-aPa843frIzI-unsplash.jpg" />}
                >
                    <div className="text-overlay">
                        <h2>전문 심리 검사</h2>
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 250, position: 'relative', marginBottom: 20, border: 'none', background: 'transparent', boxShadow: 'none' }}
                    cover={<img alt="예시 이미지" className="card-image2" src="/3d-male-figure-with-flames-head-depicting-mental-health.jpg" />}
                >
                    <div className="text-overlay">
                        <h2>인마인드 탐색</h2>
                    </div>
                </Card>
            </div>
        </div>
    );
}