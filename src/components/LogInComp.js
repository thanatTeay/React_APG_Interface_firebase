import React, { useContext, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { AuthContext } from './auth'
import firebaseConfig from '../config'
import { Alert } from 'react-st-modal'


const LogInComp = () => {
    const [verified, checkVerify] = useState(false);
    const [answerQuestion, checkAnswerQuestion] = useState(false);
    const [checkUser, setcheckUser] = useState(true);
    const db = firebaseConfig.firestore();
    const [count, setCount] = useState([]);
    let answer;
    let countP1team = 0;
    let countP2team = 0;
    //checkVerify(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
            firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value).then(cred => {

                db.collection('user').doc(cred.user.uid).update({
                    isOnline: true
                }).then(() => {


                    const res = email.value.startsWith("a");
                    if (res) {
                        window.location.href = "/MainP1"
                        console.log("A")
                    }
                    else if (!res) {
                        window.location.href = "/MainP2"
                        console.log("B")
                    }
                    //ConditionToMain();
                    //setCount(items);

                })


                
            }).catch(error => {
                var errorMessage = error.message;
                Alert(errorMessage, 'Error!');
                //alert(errorMessage);
            })


        } catch (error) {
            Alert(error, 'Error!');
            //alert(error);
        }
    }








    const { currentUser } = useContext(AuthContext);
    //alert(verified);
    if (currentUser && verified) {

        //console.log(currentUser.displayName)
        //alert(verified);
        //checkVerify(false);
        //getCurrentUserOnWeb();
        //getCurrentUserOnWeb();
        //alert(random)
        /*return (


            <Redirect to="/checkRandom" />

        )*/

    }

    return (


        <div className="container-fluid">
            <div className="row main-content bg-white text-center">
                <div className="col-md-4 text-center company_comp">
                    <span className="company__logo">
                        <p className="ps">Competitive</p>

                    </span>

                </div>
                <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                    <div className="container-fluid">
                        <div className="row">
                            <h2>Log In</h2>
                        </div>
                        <div className="row">
                            <form id="login-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <input type="text" name="email" id="email" className="form__input" placeholder="Email"
                                        required />
                                </div>
                                <div className="row">

                                    <input type="password" name="password" id="password" className="form__input"
                                        placeholder="Password" required />
                                </div>

                                <div className="row">
                                    <button className="btnlogin btn-success" type="submit">Login</button>
                                </div>

                            </form>
                        </div>

                        <div className="row">
                            <p>Don't have an account? <Link to="/signup" >Register Here</Link></p>
                        </div>

                    </div>
                </div>
            </div>
        </div >

    )
}


export default LogInComp;