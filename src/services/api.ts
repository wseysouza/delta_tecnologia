import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://parseapi.back4app.com/parse/classes',
    headers: {
        'X-Parse-Application-Id': '7WUKS5N3Pdh9Ne8qdSvIszfiApOjNG05nRxQTlig',
        'X-Parse-REST-API-Key': '8voyJEh2DniLX5dAX6CMDggXcRdoPW2sstDwD5ZD',
        'Content-Type': 'application/json'
    },
    timeout: 100,
})

