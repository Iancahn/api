import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import components
import Dots from '../components/dots';

const fetchRandomData = (pageNumber) => {
    return axios.get(`https://randomuser.me/api?=${pageNumber}`)
        .then(({ data }) => {
            // handle success
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

const makeCap = (userInfo) => {
    if (userInfo.gender === "male") {
        return "Male";
    } else {
        return "Female";
    }
}



function Api() {
    // const [randomUserData, setRandomUserData] = useState('');
    const [nextPageNumber, setNextPageNumber] = useState(1);
    const [userInfos, setUserInfos] = useState([]);

    const fetchNextUser = () => {
        fetchRandomData(setNextPageNumber).then((randomData) => {
            if (randomData === undefined) return;
            const newUserInfos = [
                ...userInfos,
                ...randomData.results,
            ]
            setUserInfos(newUserInfos);
            setNextPageNumber(randomData.info.page + 1);
        });
    }

    useEffect(() => {
        fetchNextUser();
    }, []);

    return (
        <div>
            <div>
                {userInfos.map((userInfo, idx) => {
                    return (
                        <div>
                            <div key={idx}></div>
                            <div class="row">
                                <div class="column">
                                    <h4>Profile Picture:</h4>
                                    <img className="full__img" src={userInfo.picture.large} alt="The random person" />
                                    <h4>Name and Surname:</h4>
                                    <p>{getFullUserName(userInfo)}</p>


                                </div>
                                <div class="column">
                                    <h4>Phone Number:</h4>
                                    <p>{userInfo.phone}</p>
                                    <h4>Gender:</h4>
                                    <p>{makeCap(userInfo)}</p>
                                    <h4>Email Adress:</h4>
                                    <p>{userInfo.email}</p>
                                </div>
                            </div>
                            <Dots />
                        </div>
                    )
                })}
            </div>
            <button className="button" onClick={fetchNextUser}>Load more people</button>
        </div>
    )
}

export default Api;