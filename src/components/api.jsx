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
    return `${first} ${last}`;
}

// const getProfileImage = (userInfo) => {
//     const { picture: { large } } = userImage;
//     return `${large}`;
// }

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
            {userInfos.map((userInfo, idx) => {
                return (
                    <div>
                        <div class="row">
                            <div class="column">
                                {/* <p>Name and Surname: </p> */}
                                <h4>Name and Surname:</h4>
                                <p>{getFullUserName(userInfo)}</p>
                                <h4>Gender:</h4>
                                <p>{userInfo.gender}</p>
                                <h4>Email Adress:</h4>
                                <p>{userInfo.email}</p>
                                <h4>Phone Number:</h4>
                                <p>{userInfo.phone}</p>
                            </div>
                            <div class="column">
                                {/* <p>Name and Surname: {getFullUserName(userInfo)}</p> */}
                                <h4>Profile Picture:</h4>
                                <img className="full__img" src={userInfo.picture.large} />
                                <h4>Want to meet more people?</h4>
                                <p>Click our fancy button below:</p>
                                <button className="button" onClick={fetchRandomData}>Fetch Some Data</button>
                            </div>
                        </div>


                    </div>
                )
            })}
        </div>
    )
}

export default Api;