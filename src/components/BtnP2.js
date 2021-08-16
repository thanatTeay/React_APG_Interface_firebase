import React, { useContext } from 'react'
import { AuthContext } from './auth'
import firebaseConfig from '../config'


const BtnP2 = () => {
    const { currentUser } = useContext(AuthContext);
    let countMessage = 0;
    let countP1jeer = 0;
    let countP2cheer = 0;
    let idPilot = 0;
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
    client.connect().catch(console.log("sdasdasdzxa"));




    const handleP1 = () => {
        client.say(`#ligoligo12`, `@${currentUser.displayName}, p1-`);
    }
    const handleP2 = () => {
        client.say(`#ligoligo12`, `@${currentUser.displayName}, p2+`);
    }



    /*const handleP1 = () => {


        if (idPilot == 0) {
            db.collection('user').doc(currentUser.uid).get().then(data => {
                countMessage = data.data().countSendMessage
                countP1jeer = data.data().countP1jeerBtn
                countP2cheer = data.data().countP2cheerBtn
                //console.log(data.data().countSendMessage)
                //alert(countMessage)
            }).then(() => {
                client.say(`#ligoligo12`, `@${currentUser.displayName}, p1-`);
                countP1jeer++
                countMessage++;
                idPilot++;
                db.collection('user').doc(currentUser.uid).update({

                    countSendMessage: countMessage,
                    countP1jeerBtn: countP1jeer,
                    countP2cheerBtn: countP2cheer
                })
            })

        }
        else if (idPilot % 10 == 0) {
            db.collection('user').doc(currentUser.uid).update({

                countSendMessage: countMessage,
                countP1jeerBtn: countP1jeer,
                countP2cheerBtn: countP2cheer


            }).then(() => {
                db.collection('user').doc(currentUser.uid).get().then(data => {
                    countMessage = data.data().countSendMessage
                    countP1jeer = data.data().countP1jeerBtn
                    countP2cheer = data.data().countP2cheerBtn
                    //console.log(data.data().countSendMessage)
                    //alert(countMessage)
                }).then(() => {
                    client.say(`#ligoligo12`, `@${currentUser.displayName}, p1-`);
                    countP1jeer++
                    countMessage++;
                    idPilot++;

                    //console.log("update")
                })

            })

        } else {
            client.say(`#ligoligo12`, `@${currentUser.displayName}, p1-`);
            countP1jeer++
            countMessage++;
            idPilot++;
            //console.log("not update")
        }

    }

    /*const handleP1 = () => {
        db.collection('user').doc(currentUser.uid).get().then(data => {
            countMessage = data.data().countSendMessage
            countP1jeer = data.data().countP1jeerBtn
            countP2cheer = data.data().countP2cheerBtn
            //console.log(data.data().countSendMessage)
            //alert(countMessage)
        }).then(() => {
            client.say(`#ligoligo12`, `@${currentUser.displayName}, p1-`);
            countP1jeer++
            countMessage++
            db.collection('user').doc(currentUser.uid).update({

                countSendMessage: countMessage,
                countP1jeerBtn: countP1jeer,

            })
        })
    }*/
    /*const handleP2 = () => {

        if (idPilot == 0) {
            db.collection('user').doc(currentUser.uid).get().then(data => {
                countMessage = data.data().countSendMessage
                countP1jeer = data.data().countP1jeerBtn
                countP2cheer = data.data().countP2cheerBtn
                //console.log(data.data().countSendMessage)
                //alert(countMessage)
            }).then(() => {
                client.say(`#ligoligo12`, `@${currentUser.displayName}, p2-`);
                countP2cheer++
                countMessage++;
                idPilot++;
                db.collection('user').doc(currentUser.uid).update({

                    countSendMessage: countMessage,
                    countP1jeerBtn: countP1jeer,
                    countP2cheerBtn: countP2cheer

                })
            })

        }
        else if (idPilot % 10 == 0) {
            db.collection('user').doc(currentUser.uid).update({

                countSendMessage: countMessage,
                countP1jeerBtn: countP1jeer,
                countP2cheerBtn: countP2cheer


            }).then(() => {
                db.collection('user').doc(currentUser.uid).get().then(data => {
                    countMessage = data.data().countSendMessage
                    countP1jeer = data.data().countP1jeerBtn
                    countP2cheer = data.data().countP2cheerBtn
                    //console.log(data.data().countSendMessage)
                    //alert(countMessage)
                }).then(() => {
                    client.say(`#ligoligo12`, `@${currentUser.displayName}, p2-`);
                    countP2cheer++
                    countMessage++;
                    idPilot++;

                    //console.log("update")
                })

            })

        } else {
            client.say(`#ligoligo12`, `@${currentUser.displayName}, p2-`);
            countP2cheer++
            countMessage++;
            idPilot++;
        }

    }*/







    /*const handleP2 = () => {
        db.collection('user').doc(currentUser.uid).get().then(data => {
            countMessage = data.data().countSendMessage
            countP1jeer = data.data().countP1jeerBtn
            countP2cheer = data.data().countP2cheerBtn
            //console.log(data.data().countSendMessage)
            //alert(countMessage)
        }).then(() => {
            client.say(`#ligoligo12`, `@${currentUser.displayName}, p2+`);
            countP2cheer++
            countMessage++
            db.collection('user').doc(currentUser.uid).update({

                countSendMessage: countMessage,
                countP2cheerBtn: countP2cheer

            })
        })
    }*/

    return (
        <div className="containerIF2">
            <div className="row row-cols-2">
                <button className="btn btn-danger" onClick={handleP1}>Jeer P1-</button>
                <button className="btn btn-success " onClick={handleP2}>Cheer P2+</button>
            </div>

        </div>
    )

}

export default BtnP2;