import Axios from "axios";

// const baseUrl = 'http://localhost:8080/SmartClassService/';
const baseUrl = 'http://39.98.73.72:8080/SmartClassService/';
Axios.defaults.baseURL = baseUrl;


export let getDeviceByType = (type) => {
    return (
        Axios.post("DeviceController/getDeviceByType", {
            type: type
        })
    );
}

export let getAllDeviceType = () => {
    return (
        Axios.post("DeviceController/getAllDeviceType", {
        })
    );
}

export let getNewestSurroundings = () => {
    return (
        Axios.post("QuartzManagerSurroundings/getNewestSurrounding", {
        })
    );
}

export let addSurroundings = () => {
    return (
        Axios.post("QuartzManagerSurroundings/addSurroundings", {
        })
    );
}