import React, { Component } from 'react';
import './App.css';
import { Button, Tabs, Table, Skeleton, Switch } from 'antd';
import { getDeviceByType, getAllDeviceType, } from "./api.js";

const TabPane = Tabs.TabPane;



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDeviceType: [],
            currentType: '1',
            columnData: [],
            tableLoading: true,
            typeLoading: false,
        };

    }

    componentDidMount() {
        this.tableTimeout = setInterval(() => {
            this.refreshData();
        }, 200);

        this.getAllDeviceType();
    }

    componentWillUnmount() {
        clearInterval(this.tableTimeout);
    }

    refreshData() {
        getDeviceByType(this.state.currentType)
            .then((res) => {
                let columnData = [];
                res.data.forEach((item, index) => {
                    columnData.push({
                        key: index + 1,
                        id: item.id,
                        name: item.name,
                        type: item.type,
                        isOpen: item.isOpen,
                        position: item.position,
                        state: item.state,
                        coverPercent: item.coverPercent,
                        settingTemperature: item.settingTemperature,
                        lazyNum: item.lazyNum,
                    });
                });
                this.setState({
                    columnData: columnData,
                    tableLoading: false,
                });
            })
            .catch((e) => {
                if (e.response) {
                    //请求已发出，服务器返回状态码不是2xx。
                    console.info(e.response.data)
                    console.info(e.response.status)
                    console.info(e.response.headers)
                } else if (e.request) {
                    // 请求已发出，但没有收到响应
                    // e.request 在浏览器里是一个XMLHttpRequest实例，
                    // 在node中是一个http.ClientRequest实例
                    console.info(e.request)
                } else {
                    //发送请求时异常，捕捉到错误
                    console.info('error', e.message)
                }
                console.info(e.config)
            });
    }

    getAllDeviceType() {
        this.setState({
            typeLoading: true,
        });
        getAllDeviceType()
            .then((res) => {
                this.setState({
                    allDeviceType: res.data,
                    currentType: res.data[0].typeName,
                    typeLoading: false,
                });
            })
            .catch((e) => {
                if (e.response) {
                    //请求已发出，服务器返回状态码不是2xx。
                    console.info(e.response.data)
                    console.info(e.response.status)
                    console.info(e.response.headers)
                } else if (e.request) {
                    // 请求已发出，但没有收到响应
                    // e.request 在浏览器里是一个XMLHttpRequest实例，
                    // 在node中是一个http.ClientRequest实例
                    console.info(e.request)
                } else {
                    //发送请求时异常，捕捉到错误
                    console.info('error', e.message)
                }
                console.info(e.config)
            });
    }

    render() {
        // console.log(this.state.allDeviceType);
        // console.log(this.state.currentType);
        let columns = [{
            title: "序号",
            dataIndex: "key",
            key: "key"
        }, {
            title: "名称",
            dataIndex: "name",
            key: "name"
        }, {
            title: "开/关",
            dataIndex: "isOpen",
            key: "isOpen",
            render: (text) => (
                <Switch
                    checked={text} />
            )
        }, {
            title: "设备位置",
            dataIndex: "position",
            key: "position"
        }];
        switch (this.state.currentType) {
            case 'lamp':
                columns.push({
                    title: "设备状态",
                    dataIndex: "state",
                    key: "state"
                });
                break;
            case 'window':
                columns.push({
                    title: "设备状态",
                    dataIndex: "state",
                    key: "state"
                });
                columns.push({
                    title: "合上百分比",
                    dataIndex: "coverPercent",
                    key: "coverPercent",
                    render: (text) => (
                        <div>{text + '%'}</div>
                    )
                });
                break;
            case 'curtain':
                columns.push({
                    title: "设备状态",
                    dataIndex: "state",
                    key: "state"
                });
                columns.push({
                    title: "合上百分比",
                    dataIndex: "coverPercent",
                    key: "coverPercent",
                    render: (text) => (
                        <div>{text + '%'}</div>
                    )
                });
                break;
            case 'smokeDetector':
                columns.push({
                    title: "设备状态",
                    dataIndex: "state",
                    key: "state"
                });
                break;
            case 'airConditioning':
                columns.push({
                    title: "设备状态",
                    dataIndex: "state",
                    key: "state"
                });
                columns.push({
                    title: "设定温度",
                    dataIndex: "settingTemperature",
                    key: "settingTemperature",
                    render: (text) => (
                        <div>{text + '℃'}</div>
                    )
                });
                break;
            case 'camera':
                columns.push({
                    title: "设备状态",
                    dataIndex: "state",
                    key: "state"
                });
                columns.push({
                    title: "懒散人数",
                    dataIndex: "lazyNum",
                    key: "lazyNum"
                });
                break;
            default:
                break;
        }

        let typeTabPane = this.state.allDeviceType.map((d, index) =>
            <TabPane
                tab={d.chineseName}
                key={d.typeName}>
                <Table
                    dataSource={this.state.columnData}
                    columns={columns}
                    loading={this.state.tableLoading}
                    locale={{ emptyText: '暂无数据' }}
                    rowClassName={(record, index) => index % 2 === 0 ? "rowOne" : "rowTwo"}
                    pagination={{  //分页
                        total: this.state.columnData.length, //数据总数量
                        defaultPageSize: 10, //默认显示几条一页
                        //pageSize: 10,
                        showTotal: function (total) {  //设置显示一共几条数据
                            return '共 ' + total + ' 条数据';
                        },
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: [5, 10, 20, 30],
                    }} />
            </TabPane>
        );

        return (
            <div
                style={{
                    padding: '10px'
                }}
            >
                <Skeleton loading={this.state.typeLoading} active>
                    <Tabs
                        defaultActiveKey={this.state.currentType}
                        onChange={key => this.setState({ currentType: key, tableLoading: true })}
                        animated={true}>
                        {typeTabPane}
                    </Tabs>
                </Skeleton>
            </div>
        );
    }
}

export default App;
