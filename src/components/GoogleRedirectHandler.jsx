import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "../token";

function RedirectGoogleAuth() {
    const navigate = useNavigate();

    useEffect(() => {


        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');


        if (accessToken) {

            localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);

            //verify the token from the backend
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            axios.get('http://localhost:8000/api/auth/user/')
                .then(response => {

                    navigate('/dashboard')
                })
                .catch(error => {
                    console.error('Error verfiying token:', error.response ? error.response.data : error.message);
                    navigate('/login');
                });
        } else {
            console.log('No token found in URL');
            navigate('/login');
        }
    }, [navigate])

    return <div>Logging In.........</div>
}

export default RedirectGoogleAuth;