import { InboxOutlined } from '@ant-design/icons';
import { message, Upload as AntdUpload } from 'antd';

const { Dragger } = AntdUpload;

export const Upload = _ => (
    <>
        <Dragger>
            <p className='ant-upload-drag-icon'>
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">사용자님의 상담 데이터를 업로드해주세요!</p>
            <p className="ant-upload-hint">단일 또는 대량 업로드를 지원합니다.</p>
        </Dragger>
    </>
)