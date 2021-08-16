import React, { useContext, useState, useEffect, Component } from 'react'
import { AuthContext } from './auth'
import firebaseConfig from '../config'
import { CustomDialog } from 'react-st-modal'
import { readRemoteFile } from 'react-papaparse'





const Nav = () => {

    const { currentUser } = useContext(AuthContext);
    const db = firebaseConfig.firestore();
    const [blogs, setBlogs] = useState([])
    function getUserData() {
        //console.log("getUserData2")
        db.collection('user').orderBy("countSendMessage", "desc").limit(10).get().then(querySnapshot => {
            const items = [];
            querySnapshot.forEach(doc => {
                items.push(doc.data())
            });
            setBlogs(items);
        })
    }

    useEffect(() => {
        getUserData();
        //console.log("getUserData")
    }, [])

    /*function readCSV(){
        readRemoteFile(
            "https://drive.google.com/uc?id=1GhTUtZX4aEXjhY-BznR0RqYfVtY3lDTE",
            {
              complete: (results) => {
                console.log('Results:', results)
              }
            }
          )
    }*/



    function EmbededGoogleSheet() {
        return (
            <div className="containerIF">
                <div className="row">
                    {/* <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSkQOavXwJjbSuUDdtspqjEwmbgCLc2pC7EromgysGZrmX0BJmm1x_6mRRqj71RJnMcj_n4CBld9McT/pubhtml?gid=349047516&amp;single=true&amp;widget=true&amp;headers=false" width="15vw" height="500vh"></iframe> */}
                    

                    <iframe src="https://p-library.com/t/lab/ftg/" width="15vw" height="500vh*"></iframe> 
                    

                </div>
            </div>
        )

    }




    function CustomDialogContent() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mx-auto text-center mb-0 ">
                            <div className="responsive-iframe">
                                <div className="row row-col-2">
                                    <h6 className="col col-2">Name</h6>
                                    <h6 className="col">Cheer Player 1</h6>
                                    <h6 className="col">Jeer Player 1</h6>
                                    <h6 className="col">Cheer Player 2</h6>
                                    <h6 className="col">Jeer Player 2</h6>
                                    <h6 className="col">Winner Player 1 team</h6>
                                    <h6 className="col">Winner Player 2 team</h6>
                                    <h6 className="col">Total</h6>
                                </div>
                                {
                                    blogs.map(blog => {
                                        return (
                                            <div className="row row-col-2" key={blog.displayName}>

                                                <p className="col col-2">{blog.displayName}</p>
                                                <p className="col">{blog.countP1cheerBtn}</p>
                                                <p className="col">{blog.countP1jeerBtn}</p>
                                                <p className="col">{blog.countP2cheerBtn}</p>
                                                <p className="col">{blog.countP2jeerBtn}</p>
                                                <p className="col">{blog.countP1win}</p>
                                                <p className="col">{blog.countP2win}</p>
                                                <p className="col">{blog.countSendMessage}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    function Signout() {
        console.log(currentUser.uid)
        db.collection('user').doc(currentUser.uid).update({

            isOnline: false,
            isP1team: false,
            isP2team: false,

        }).then(() => {
            firebaseConfig.auth().signOut()
        }).catch(error => {
            var errorMessage = error.message;
            alert(errorMessage, 'Error!');
            //alert(errorMessage);
        })

    }



    return (
        <div className="thead-dark">
            <div className="row row-cols-2">
                <div className="col-lg-12 mx-auto text-center mb-0 mt-3 ">
                    <label className="col-md-2">Display Name:</label>
                    <span className="col-md-4" id="display-name">{currentUser.displayName}</span>
                    <label className="col-md-2"><button className="btn btn-outline-info" onClick={() => Signout()} >Sign out</button></label>
                    <button className="btn btn-outline-info"
                        onClick={async () => {//await getUserData();
                            const result = CustomDialog(<EmbededGoogleSheet />, {
                                title: 'Leaderboard',
                                showCloseIcon: true,
                            });
                        }}
                    >
                        Leaderboard
                    </button>



                </div>
            </div>
        </div>
    )




}

export default Nav;