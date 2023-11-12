'use client';
import { getSession } from '@auth0/nextjs-auth0';

async function ProfileServer() {
  try {
    const { user } = await getSession();
    console.log(user);
  } catch (error) {
    console.error('Error fetching user session:', error);
  }
}

export default ProfileServer;


// return (
//     user && (
//         <div>
//           <img src={user.picture} alt={user.name} />
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//         </div>
//     )
// );


