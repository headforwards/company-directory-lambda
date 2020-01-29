import React, { useState, useEffect, useContext } from 'react'
import TokenContext from '../utils/TokenContext'
import { getPhotoForUser } from '../utils/MSGraphService'
import AvatarIcon from './AvatarIcon'

interface AvatarProps {
    userId: string | undefined
    displayName: string | undefined
}

const Avatar: React.SFC<AvatarProps> = ({ userId, displayName }) => {

    const [imageUrl, setImageUrl] = useState<string | undefined>('')
    const token = useContext(TokenContext)

    useEffect(() => {
        async function getAvatar() {
            if (userId && token) {
                try {
                    const photoUrl = await getPhotoForUser(token, userId);
                    setImageUrl(photoUrl);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getAvatar()
    }, [userId, token, displayName])

    return(
        <AvatarIcon imageUrl={imageUrl} displayName={displayName} />
    )

}

export default Avatar
