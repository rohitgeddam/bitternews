import { useEffect, useState } from 'react'

import '../styles/auth.scss'
function Register() {
   
    
    return (
        <div class="box auth-box">
               
         
                    <div class="auth-box__email">
                        <label for="auth-box__email">Email</label>
                        <input id="auth-box__email" class="input" type="text" placeholder="Email"/>
                    </div>
                    <div class="auth-box__username">
                        <label for="auth-box__username">Username</label>
                        <input id="auth-box__username" class="input" type="text" placeholder="Username"/>
                    </div>

                    <div class="auth-box__password">
                        <label for="auth-box__password">Password</label>
                        <input id="auth-box__password" class="input" type="password" placeholder="Password"/>
                    </div>

                    <div class="auth-box__submit">
                        <button class="auth-box__submit-btn">Register</button>
                    </div>
            
        </div>
    
    )
}

export default Register;