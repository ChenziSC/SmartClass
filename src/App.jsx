import React, { Component } from 'react';
import './App.css';
import { Button, Tabs, Table, Skeleton, Switch, Row, Col, Card, } from 'antd';
import { getDeviceByType, getAllDeviceType, getNewestSurroundings, addSurroundings } from "./api.js";

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
            surroundingsLoading: true,
            surroundings: {},
        };

    }

    componentDidMount() {
        this.tableTimeout = setInterval(() => {
            this.refreshData();
        }, 5000);

        this.getAllDeviceType();
        addSurroundings()
            .then((res) => {
                console.log(res.data)
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

    componentWillUnmount() {
        clearInterval(this.tableTimeout);
    }

    refreshData() {
        this.setState({
            tableLoading: true,
        });
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


        this.setState({
            surroundingsLoading: true,
        });
        getNewestSurroundings()
            .then((res) => {
                this.setState({
                    surroundings: res.data,
                    surroundingsLoading: false,
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
        let gridStyle = {
            marginBottom: 24,
        };
        return (
            <div
                style={{
                    padding: '10px'
                }}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Card
                            style={gridStyle}
                            bodyStyle={{
                                height: 160,
                                padding: '12px 16px',
                                backgroundColor: 'rgb(233, 217, 211)',
                            }}
                            bordered={false}>
                            <Skeleton loading={this.state.surroundingsLoading} active>
                                <Row
                                    style={{ height: '100%' }}
                                    type="flex"
                                    justify="space-around"
                                    align="middle">
                                    <Col span={6}>
                                        <img className="charticon"
                                            src={require("./img/光照.png")} />
                                    </Col>
                                    <Col span={18} style={{ width: 200 }}>
                                        <Row style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#000",
                                            textAlign: "center",
                                        }}>
                                            光照
                                        </Row>
                                        <Row style={{
                                            fontSize: "30px",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}>
                                            {this.state.surroundings.light}
                                        </Row>
                                    </Col>
                                </Row>
                            </Skeleton>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={gridStyle}
                            bodyStyle={{
                                height: 160,
                                padding: '12px 16px',
                                backgroundColor: 'rgb(210, 208, 223)',
                            }}
                            bordered={false}>
                            <Skeleton loading={this.state.surroundingsLoading} active>
                                <Row
                                    style={{ height: '100%' }}
                                    type="flex"
                                    justify="space-around"
                                    align="middle">
                                    <Col span={6}>
                                        <img className="charticon"
                                            src={require("./img/温度.png")} />
                                    </Col>
                                    <Col span={18} style={{ width: 200 }}>
                                        <Row style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#000",
                                            textAlign: "center",
                                        }}>
                                            温度
                                        </Row>
                                        <Row style={{
                                            fontSize: "30px",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}>
                                            {this.state.surroundings.temperature}
                                        </Row>
                                    </Col>
                                </Row>
                            </Skeleton>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={gridStyle}
                            bodyStyle={{
                                height: 160,
                                padding: '12px 16px',
                                backgroundColor: 'rgb(207, 218, 213)',
                            }}
                            bordered={false}>
                            <Skeleton loading={this.state.surroundingsLoading} active>
                                <Row
                                    style={{ height: '100%' }}
                                    type="flex"
                                    justify="space-around"
                                    align="middle">
                                    <Col span={6}>
                                        <img className="charticon"
                                            src={require("./img/烟尘.png")} />
                                    </Col>
                                    <Col span={18} style={{ width: 200 }}>
                                        <Row style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#000",
                                            textAlign: "center",
                                        }}>
                                            烟尘
                                        </Row>
                                        <Row style={{
                                            fontSize: "30px",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}>
                                            {this.state.surroundings.smoke}
                                        </Row>
                                    </Col>
                                </Row>
                            </Skeleton>
                        </Card>
                    </Col>
                </Row>
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
