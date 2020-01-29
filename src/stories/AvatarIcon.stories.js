import React from 'react'
import AvatarIcon from '../components/AvatarIcon'


export default {
    title: 'AvatarIcon',
    component: AvatarIcon
}

export const NameOnly = () => <AvatarIcon displayName="Jeff Bob" />

export const WithImage = () => (
    <AvatarIcon imageUrl="https://image.flaticon.com/icons/svg/1077/1077114.svg" displayName={"Brian"} />

)