"use client"
import ProfilePage from "../../profile/profilePage"
import { api } from 'src/trpc/react';
export default function Page({ params }: { params: { userslug: string } }) {
    // get user by slug
    const { data: user } = api.user.getUser.useQuery({ userId: params.userslug });
    console.table(user);
    if (!user) {
        return <div>Loading...</div>
    }
    return <ProfilePage user={user} />
}