import React, { useState, useEffect, useContext } from 'react'
import TokenContext from '../utils/TokenContext'
import { getPhotoForUser } from '../utils/MSGraphService'

interface AvatarProps {
    userId: string | undefined
    displayName: string | undefined
}

const emptyAvatarStyle = {
    width: '200px',
    fontSize: '80px',
    textAlign: 'center',
    color: 'lightgray'
} as any

const Avatar: React.SFC<AvatarProps> = ({ userId, displayName }) => {

    const [imageUrl, setImageUrl] = useState<string | undefined>('')
    const token = useContext(TokenContext)

    useEffect(() => {
        async function getAvatar() {
            if (userId && token) {
                try {
                    const photoUrl = await getPhotoForUser(token, userId);
                    setImageUrl(photoUrl);
                    console.log(photoUrl)

                } catch (err) {
                    console.log(err);
                }
            }
        }
        getAvatar()
    }, [userId, token, displayName])

    if (imageUrl) {
        return (
            <>
                <img className="db w-100" src={imageUrl} title={displayName} alt={`Photo of ${displayName}`} />
            </>

        )
    } else return (
     <img className="db w-100" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" title={`What does ${displayName} look like?`} alt={`No-one knows what ${displayName} looks like!`} />
    )

}

export default Avatar
