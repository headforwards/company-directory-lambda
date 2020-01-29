import React from 'react'



interface AvatarIconProps {
    imageUrl?: string
    displayName: string | undefined
}

const AvatarIcon: React.SFC<AvatarIconProps> = ({ imageUrl, displayName }) => {

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

export default AvatarIcon
