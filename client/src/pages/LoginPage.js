import { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';
import { validate } from 'email-validator'
import UserContext from '../UserContext'
import {AUTH_TOKEN} from '../constants'
import '../styles/auth.scss'

const LOGIN_MUTATION = gql`
    mutation signInUser($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
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

function Login() {
    const { user, setUser } = useContext(UserContext);

    const history = useHistory();

    const [details, setDetails] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState({isError: false, message: ''})


   const [signInUser, { loading, data }] = useMutation(LOGIN_MUTATION, {
    variables: {
        email: details.email,
        password: details.password
    },
    onCompleted: ({signIn}) => {
        console.log("DATAAA", signIn)
        if(signIn.status !== 'Success') {
            // error
            setDetails({email: '', password:''})
            setError({isError: true, message: signIn.message})
        } else {
            // success
            const loginData = signIn.data;
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
       if(details.email.trim() === '' || details.password.trim() === '') {
           setError({isError:true, message: 'invalid input'})
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

    const handleSubmit =  (e) => {
        e.preventDefault();
        if (checkDetails() ){
            signInUser()
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
                        Login
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

export default Login;