import React, { useState, useEffect, useContext } from 'react'
import TokenContext from '../utils/TokenContext'
import { getPhotoForUser } from '../utils/MSGraphService'

interface AvatarProps {
    userId: string | undefined,
    displayName?: string
}

const emptyAvatarStyle= {
    width: '200px', 
    fontSize:'80px',
    textAlign: 'center',
    color: 'lightslategray'
} as any

const Avatar: React.SFC<AvatarProps> = ({ userId, displayName}) => {

    const [imageUrl, setImageUrl] = useState<string|undefined>('')
    const token = useContext(TokenContext)

    useEffect(() => {
        async function getAvatar() {
            if (userId && token ) {
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
            <img src={imageUrl} width={200} height={200} title={displayName} alt={`Photo of ${displayName}`} />
        </>
    )
 } else return (
     <div 
     className="fas fa-user-circle fa-lg rounded-circle align-self-center mr-2"
     style={emptyAvatarStyle}
        >

     </div>
 )

}

export default Avatar
