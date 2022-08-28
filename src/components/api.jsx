import React, { useState, useEffect } from 'react';
import axios from 'axios';

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(data => console.log(data));



const fetchRandomData = () => {
    return axios.get('https://randomuser.me/api/')
        .then(({ data }) => {
            // handle success
            console.log(data);
            return data;
        })
        .catch(error => {
            // handle error
            console.log(error);
        });
}

const getFullUserName = (userInfo) => {
    const { name: { first, last } } = userInfo;
    return `${first}, and ${last}`;
}


function Api() {
    const [randomUserData, setRandomUserData] = useState('');
    const [userInfos, setUserInfos] = useState([]);

    useEffect(() => {
        fetchRandomData().then(randomData => {
            setRandomUserData(JSON.stringify(randomData) || 'No user data found');
            setUserInfos(randomData.results);
        })
    }, []);

    return (
        <div>
            <button onClick={fetchRandomData}>Fetch Some Data</button>
            <p>{randomUserData}</p>
            {userInfos.map((userInfo, idx) => {
                <p>{getFullUserName(userInfo)}</p>
            })}
        </div>
    )
}

export default Api;