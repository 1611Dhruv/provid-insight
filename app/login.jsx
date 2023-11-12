import { getSession } from '@auth0/nextjs-auth0';

export default function Login() {
    console.log( getSession() );
    return <a href="/api/auth/login">Login</a>;
}