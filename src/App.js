import './App.css';
import {Card, Space, Switch, Typography} from 'antd';
import HomePage from './components/HomePage';
import {useLiveSessionState} from "state-persist";
import {appHeader} from "./api/translator";
import {useEffect} from "react";

function App() {
    const [language, setLanguage] = useLiveSessionState("uiLanguage", "hindi");
    const [checked, setChecked] = useLiveSessionState("switchState", false);

    useEffect(() => {
        if (checked) {
            setLanguage("eng")
        } else {
            setLanguage("hindi")
        }
// eslint-disable-next-line
    }, [checked])

    function onChange(checked) {
        setChecked(checked)
    }

    return (
        <Card bordered={false}>
            <Space style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography.Title>{appHeader(language)}</Typography.Title>

            </Space>
            <Space>
                <Typography.Text>हिंदी</Typography.Text> <Switch defaultChecked={checked} onChange={onChange}/>
                <Typography.Text>English</Typography.Text>
            </Space>
            <br/><br/>
            <HomePage/>
        </Card>
    );
}

export default App;
