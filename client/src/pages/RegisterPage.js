import { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';
import { validate } from 'email-validator'
import UserContext from '../UserContext'
import {AUTH_TOKEN} from '../constants'
import '../styles/auth.scss'

const REGISTER_MUTATION = gql`
    mutation signUpUser($email: String!, $password: String!, $username: String!) {
        signUp(email: $email, password: $password, username: $username) {
            status
            message
            data {
                token
                user {
                    id
                    email
                    username
                }
            }
        }

    }


`

function Register() {
    const { user, setUser } = useContext(UserContext);
   
    const history = useHistory();

    const [details, setDetails] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState({isError: false, message: ''})


   const [signUpUser, { loading, data }] = useMutation(REGISTER_MUTATION, {
    variables: {
        username: details.username,
        email: details.email,
        password: details.password
    },
    onCompleted: ({signUp}) => {
        console.log("DATAAA", signUp)
        if(signUp.status !== 'Success') {
            // error
            setDetails({email: '', password:''})
            setError({isError: true, message: signUp.message})
        } else {
            // success
            const loginData = signUp.data;
            console.log("SIGNIN", loginData)
            localStorage.setItem(AUTH_TOKEN, loginData.token);
            setUser({
                userId: loginData.user.id,
                email: loginData.user.email,
                username: loginData.user.username
            })
            history.push('/')

        }
    }
   });


   const checkDetails = () => {
       if (details.username.trim() === "" || details.email.trim() === "" || details.password.trim() === ""){
        setError({isError:true, message: "Please fill the details correctly"})

        return false;
       }
       if (!validate(details.email)) {
        setError({isError:true, message: 'invalid email address'})
        return false;
         
    }
       return true;
   }

   


    const handleEmail = (e) => {
        setDetails({...details, email: e.target.value})
    }
    
    const handlePassword = (e) => {
        setDetails({...details, password: e.target.value})
    }

    const handleUsername = (e) => {
        setDetails({...details, username: e.target.value})
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
        if (checkDetails()){
            signUpUser()
        } 
        
    }

    if(loading) {
        return <>Loading...</>
    }

 

   

    return (
        <div class="box auth-box">
            <pre>{JSON.stringify(user)}</pre>
                <div class="auth-box__email">
                    <label for="auth-box__email">Email</label>
                    <input
                     id="auth-box__email"
                     class="input"
                     type="text"
                     placeholder="Email"
                     value={details.email}
                     onChange={handleEmail}
                     />
                </div>

                <div class="auth-box__username">
                    <label for="auth-box__username">Username</label>
                    <input
                     id="auth-box__username"
                     class="input"
                     type="text"
                     placeholder="Username"
                     value={details.username}
                     onChange={handleUsername}
                     />
                </div>

                <div class="auth-box__password">
                    <label for="auth-box__password">Password</label>
                    <input
                     id="auth-box__password"
                     class="input"
                     type="password"
                     placeholder="Password"
                     value={details.password}
                     onChange={handlePassword}
                     />
                </div>

                <div class="auth-box__submit">
                    <button
                    class="auth-box__submit-btn"
                    onClick={handleSubmit}
                    >
                        Register
                    </button>
                </div>



           {
               error.isError && 
               <div class="auth-box__error">
                    <p>{error.message}</p>
               </div>
           }


            
        </div>
    
    )
}

export default Register;