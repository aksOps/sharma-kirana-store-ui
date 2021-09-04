import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Popconfirm, Skeleton, Space, Table, Typography} from "antd";
import {ADD_CUSTOMER, DELETE_CUSTOMER_BY_ID, GET_ALL_CUSTOMER, needToImplementWarning} from "../api/constant"
import axios from "axios";
import {DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import {useLiveSessionState} from 'state-persist';
import {
    addNewCustomerMessage,
    debitAmount,
    deleteCustomerMessage,
    depositAmount,
    newCustomer,
    submitButton,
    tableHeaderAddress,
    tableHeaderName,
    tableHeaderPhone
} from "../api/translator";

const formInitialValue = {
    address: "",
    id: "",
    mobileNumber: "",
    name: ""
}
const HomePage = () => {
    const [form] = Form.useForm();
    const [source, setSource] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [openAddCustomer, setOpenAddCustomer] = useLiveSessionState("openAddCustomerModal", false);
    const [selectedRowId, setSelectedRowId] = useState("");
    const [language] = useLiveSessionState("uiLanguage", "hindi");
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteProgress, setDeleteProgress] = useState(false)
    const [selectedData, setSelectedData] = useState(formInitialValue)
    const [openActionTab, setOpenActionTab] = useState(false)
    useEffect(() => {
        const getAllCustomer = async () => {
            await axios.get(GET_ALL_CUSTOMER)
                .then(function (response) {
                    if (response.status === 200) {
                        setLoaded(true)
                        setSource(response.data);
                        console.log(response.data)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        if (!loaded) {
            getAllCustomer().then()
        }
    }, [loaded])


    const deleteCustomerById = async () => {
        setDeleteProgress(true)
        await axios.delete(DELETE_CUSTOMER_BY_ID(selectedRowId))
            .then(function (response) {
                console.log(response)
                setDeleteProgress(false)
            })
            .catch(function (error) {
                console.log(error);
                setDeleteProgress(false)
            }).then(() => {
                setShowConfirm(false)
                setLoaded(false)
                setOpenActionTab(false)
            })
    }

    const columns = [
        {
            title: tableHeaderName(language),
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: tableHeaderPhone(language),
            key: 'mobileNumber',
            dataIndex: "mobileNumber"

        },
        {
            title: tableHeaderAddress(language),
            key: 'address',
            dataIndex: "address"
        }
    ];

    const buttonColor = (color) => {
        return {
            background: color,
            border: color
        }
    }

    const onFinish = (values) => {
        console.log(values);
        addCustomer(values).then()
        setOpenAddCustomer(false)
    };
    const addCustomer = async (values) => {
        await axios.post(ADD_CUSTOMER, values)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            }).then(() => {
                setLoaded(false)
            })
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Space>
                <Button type="primary" style={buttonColor("#d065e6")} loading={!loaded} icon={<ReloadOutlined/>}
                        onClick={() => {
                            setLoaded(false)
                        }}/>
                <Button type="primary" style={buttonColor("#21bf40")} icon={<PlusOutlined/>} onClick={() => {
                    setOpenAddCustomer(true)
                }}>{newCustomer(language)}</Button>

            </Space>

            <br/>
            <br/><br/>
            {loaded ?
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            console.log(record)
                            setSelectedRowId(record.id)
                            setSelectedData(record)
                            setOpenActionTab(true)

                        }
                    };
                }} rowKey="id" dataSource={source} columns={columns}/> : <Skeleton active/>}


            <Modal title={addNewCustomerMessage(language)} visible={openAddCustomer} footer={null}
                   onCancel={() => setOpenAddCustomer(false)} destroyOnClose closable>
                <>
                    <Form
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item name={"name"}>
                            <Input required placeholder={tableHeaderName(language)}/>
                        </Form.Item>
                        <Form.Item name={"address"}>
                            <Input required placeholder={tableHeaderAddress(language)}/>
                        </Form.Item>
                        <Form.Item name={"mobileNumber"}>
                            <Input pattern="[+-]?\d+(?:[.,]\d+)?" type="text" maxLength={10} minLength={10} required
                                   placeholder={tableHeaderPhone(language)}/>
                        </Form.Item>
                        <Space>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">{submitButton(language)}</Button>
                            </Form.Item>
                        </Space>
                    </Form>
                </>
            </Modal>

            <Modal title={<Space>
                <Typography.Text>{(selectedData.name).concat(" (").concat(selectedData.mobileNumber).concat(")")}</Typography.Text>
                <Popconfirm
                    title={deleteCustomerMessage(language)}
                    visible={showConfirm && openActionTab}
                    onConfirm={() => deleteCustomerById()}
                    okButtonProps={{loading: deleteProgress}}
                    onCancel={() => {
                        setShowConfirm(false)
                    }}
                >
                    <Button type="primary" style={buttonColor("#cf3429")} icon={<DeleteOutlined/>} onClick={() => {
                        setShowConfirm(true)
                    }}/>
                </Popconfirm>
                <Button type="primary" style={buttonColor("#d49217")} icon={<EditOutlined/>} onClick={() => {
                    needToImplementWarning()
                }}/>
            </Space>} visible={openActionTab} footer={null}
                   onCancel={() => {
                       setShowConfirm(false)
                       setOpenActionTab(false)

                   }} destroyOnClose closable>
                <Space direction="vertical" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <Space>
                        <Button type="primary" style={buttonColor("red")} icon={<MinusOutlined/>} onClick={() => {
                            needToImplementWarning()
                        }}>{debitAmount(language)}</Button>
                        <Button type="primary" style={buttonColor("green")} icon={<PlusOutlined/>} onClick={() => {
                            needToImplementWarning()
                        }}>{depositAmount(language)}</Button>
                    </Space>
                </Space>
                {/*<>
                    <Form
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item label={tableHeaderName(language)}  name={"name"}>
                            <Input required defaultValue={selectedData.name}/>
                        </Form.Item>
                        <Form.Item label={tableHeaderAddress(language)} name={"address"}>
                            <Input required  defaultValue={selectedData.address}/>
                        </Form.Item>
                        <Form.Item label={tableHeaderPhone(language)}  name={"mobileNumber"}>
                            <Input pattern="[+-]?\d+(?:[.,]\d+)?" type="text" maxLength={10} minLength={10} required  defaultValue={selectedData.mobileNumber}/>
                        </Form.Item>
                        <Space>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">{submitButton(language)}</Button>
                            </Form.Item>
                        </Space>
                    </Form>
                </>*/}
            </Modal>
        </div>

    );
}

export default HomePage;

