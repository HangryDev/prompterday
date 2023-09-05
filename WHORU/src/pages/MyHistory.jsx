import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';


export const MyHistory = _ => (
    <>
        <h2>분석결과창</h2>
        <h3>사용자님의 분석결과는 다음과 같습니다</h3>
        <Timeline
            mode="left"
            items={[
                {
                    label: '2023-08-28 15:20',
                    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                },
                {
                    label: '2023-08-29 15:20',
                    children: '분석결과 내용2',
                    color: 'green',
                },
                {
                    label: '2023-08-30 15:20',
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    children: `분석결과 내용3`,
                },
                {
                    label: '2023-09-01 15:20',
                    color: 'red',
                    children: '분석결과 내용4',
                },
                {
                    label: '2023-09-02 15:20',
                    children: '분석결과 내용5',
                },
                {
                    label: '2023-09-03 15:20',
                    dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    children: '분석결과 내용6',
                },
            ]}
        />
    </>
)