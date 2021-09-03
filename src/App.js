import './App.css';
import {Card, Typography} from 'antd';
import HomePage from './components/HomePage';

function App() {
    return (
        <Card bordered={false}>
            <Typography.Title style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>Sharma General Store</Typography.Title>
            <HomePage/>
        </Card>
    );
}

export default App;
