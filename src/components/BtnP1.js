import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './auth'
import firebaseConfig from '../config'

// for player 1 team
const BtnP1 = () => {
    const { currentUser } = useContext(AuthContext);
    const [isRunning, setIsRunning] = useState(true);
    const [isCooldownP1, setIsCooldownP1] = useState(false);
    const [isCooldownP2, setIsCooldownP2] = useState(false);
    //const [countMessage, setCountMessage] = useState(0)
    //const [countP1cheer, setCountP1cheer] = useState(0)
    //const [countP2jeer, setCountP2jeer] = useState(0)
    let idPilot = 0;
    let countMessage = 0;
    let countP1cheer = 0;
    let countP2jeer = 0;
    let loop = 0;
    const db = firebaseConfig.firestore();

    const tmi = require('tmi.js');
    const client = new tmi.Client({
        options: { debug: true, messagesLogLevel: "info" },
        connection: {
            reconnect: true,
            secure: true
        },
        identity: {
            username: 'ligoligo12',
            password: 'oauth:slrf3h7524cpsvsmrzieqvxzx98a8c'
        },
        channels: ['ligoligo12']
    });
    client.connect().catch(console.log("asdasdasd"));

    /*function getUserData() {
        console.log("getUserData2")
        db.collection('user').doc(currentUser.uid).get().then(data => {
            //setCountMessage(data.data().countSendMessage)
            //setCountP1cheer(data.data().countP1cheerBtn)
            //setCountP2jeer(data.data().countP2jeerBtn)
            countMessage = data.data().countSendMessage
            countP1cheer = data.data().countP1cheerBtn
            countP2jeer = data.data().countP2jeerBtn
            console.log(countMessage)
            console.log(countP1cheer)
            console.log(countP2jeer)
        })
    }*/

    useEffect(() => {
        const client = new tmi.Client({
            options: { debug: true, messagesLogLevel: "info" },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: 'ligoligo12',
                password: 'oauth:slrf3h7524cpsvsmrzieqvxzx98a8c'
            },
            channels: ['ligoligo12']
        });
        client.connect().catch(console.error);
    }, [])
    

   
    const handleP1 = () => {
        if(isCooldownP1 == false)
        {
            client.say(`#ligoligo12`, `@${currentUser.displayName}, p1+`).then(()=>{
                setIsCooldownP1(isCooldownP1 => true)
                setTimeout(function () {
                    //btn.prop('disabled', false);
                    setIsCooldownP1(isCooldownP1 => false)
                    console.log(isCooldownP1)
                }, 1000);
    
            }).catch(e =>{
                console.log(e)
            })
        }
        

    }
    const handleP2 = () => {
       
        client.say(`#ligoligo12`, `@${currentUser.displayName}, p2-`).then(()=>{
            setIsCooldownP2(isCooldownP2 => true)
            setTimeout(function () {
                //btn.prop('disabled', false);
                setIsCooldownP2(isCooldownP2 => false)
                console.log(isCooldownP2)
                //console
            }, 1000);

        }).catch(e =>{
            console.log(e)
        })
    }
    /*const handleP1 = () => {
       // if (!isCooldown) {
        //    setIsCooldown(isCooldown => true)
         //   console.log("You can click button")
         //   console.log(isCooldown)
            //cooldownButton()

            if (idPilot == 0) {
                db.collection('user').doc(currentUser.uid).get().then(data => {
                    countMessage = data.data().countSendMessage
                    countP1cheer = data.data().countP1cheerBtn
                    countP2jeer = data.data().countP2jeerBtn
                    //console.log(data.data().countSendMessage)
                    //alert(countMessage)
                }).then(() => {
                    client.say(`#ligoligo12`, `@${currentUser.displayName}, p1+`);
                    countP1cheer++;
                    countMessage++;
                    idPilot++;
                    db.collection('user').doc(currentUser.uid).update({

                        countSendMessage: countMessage,
                        countP1cheerBtn: countP1cheer,
                        countP2jeerBtn: countP2jeer


                    })
                })

            }
            else if (idPilot % 10 == 0) {
                db.collection('user').doc(currentUser.uid).update({

                    countSendMessage: countMessage,
                    countP1cheerBtn: countP1cheer,
                    countP2jeerBtn: countP2jeer


                }).then(() => {
                    db.collection('user').doc(currentUser.uid).get().then(data => {
                        countMessage = data.data().countSendMessage
                        countP1cheer = data.data().countP1cheerBtn
                        countP2jeer = data.data().countP2jeerBtn
                        //console.log(data.data().countSendMessage)
                        //alert(countMessage)
                    }).then(() => {
                        client.say(`#ligoligo12`, `@${currentUser.displayName}, p1+`);
                        countP1cheer++;
                        countMessage++;
                        idPilot++;

                        //console.log("update")
                    })

                    //client.say(`#ligoligo12`, `@${currentUser.displayName}, p1+`);
                    //setCountP1cheer(countP1cheer=>countP1cheer + 1)
                    //setCountMessage(countMessage=>countMessage + 1)
                    //countP1cheer+=1;
                    //countMessage+=1;
                    //console.log(countMessage)
                    //console.log(countP1cheer)
                    // console.log(countP2jeer)

                    /*db.collection('user').doc(currentUser.uid).update({
            
                        countSendMessage: countMessage,
                        countP1cheerBtn: countP1cheer
            
            
                    })

                })

            } else {
                client.say(`#ligoligo12`, `@${currentUser.displayName}, p1+`);
                countP1cheer++;
                countMessage++;
                idPilot++;
                //console.log("not update")
            }

        //}



    }*/
    /*const handleP2 = () => {

        if (idPilot == 0) {
            db.collection('user').doc(currentUser.uid).get().then(data => {
                countMessage = data.data().countSendMessage
                countP1cheer = data.data().countP1cheerBtn
                countP2jeer = data.data().countP2jeerBtn
                //console.log(data.data().countSendMessage)
                //alert(countMessage)
            }).then(() => {
                client.say(`#ligoligo12`, `@${currentUser.displayName}, p2-`);
                countP2jeer++;
                countMessage++;
                idPilot++;
                db.collection('user').doc(currentUser.uid).update({

                    countSendMessage: countMessage,
                    countP1cheerBtn: countP1cheer,
                    countP2jeerBtn: countP2jeer

                })
            })

        }
        else if (idPilot % 10 == 0) {
            db.collection('user').doc(currentUser.uid).update({

                countSendMessage: countMessage,
                countP1cheerBtn: countP1cheer,
                countP2jeerBtn: countP2jeer


            }).then(() => {
                db.collection('user').doc(currentUser.uid).get().then(data => {
                    countMessage = data.data().countSendMessage
                    countP1cheer = data.data().countP1cheerBtn
                    countP2jeer = data.data().countP2jeerBtn
                    //console.log(data.data().countSendMessage)
                    //alert(countMessage)
                }).then(() => {
                    client.say(`#ligoligo12`, `@${currentUser.displayName}, p2-`);
                    countP2jeer++;
                    countMessage++;
                    idPilot++;

                    //console.log("update")
                })

                //client.say(`#ligoligo12`, `@${currentUser.displayName}, p1+`);
                //setCountP1cheer(countP1cheer=>countP1cheer + 1)
                //setCountMessage(countMessage=>countMessage + 1)
                //countP1cheer+=1;
                //countMessage+=1;
                //console.log(countMessage)
                //console.log(countP1cheer)
                // console.log(countP2jeer)

                /*db.collection('user').doc(currentUser.uid).update({
        
                    countSendMessage: countMessage,
                    countP1cheerBtn: countP1cheer
        
        
                })

            })

        } else {
            client.say(`#ligoligo12`, `@${currentUser.displayName}, p2-`);
            countP2jeer++;
            countMessage++;
            idPilot++;
        }

    }*/

    /*useEffect(() => {
        if (isRunning) {
            //alert("re")
            const id = window.setInterval(() => {

                client.say(`#ligoligo12`, `@${currentUser.displayName}, p1+`);


                if (loop == 5000) {
                    setIsRunning(isRunning => false)
                } else {
                    console.log(loop)
                    loop++;

                }




            }, 200)


            //console.log("isRunning:"+isRunning)
            return () => window.clearInterval(id);
        }



    }, [isRunning])*/

    return (
        <div className="containerIF2">
            <div className="row row-cols-2">

                <button className="btn btn-success"   onClick={handleP1}>{isCooldownP1 && "cooldown"}{!isCooldownP1 && "Cheer P1+"}</button>
                <button className="btn btn-danger" disabled={isCooldownP2} onClick={handleP2}>{isCooldownP2 && "cooldown"}{!isCooldownP2 && "Jeer P2-"}</button>
            </div>

        </div>
    )

}

export default BtnP1;