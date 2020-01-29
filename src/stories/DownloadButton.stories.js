import React from 'react'
import Avatar from '../components/DownloadButton'
import DownloadButton from '../components/DownloadButton'

export default {
    title: 'DownloadButton',
    component: DownloadButton
}

export const Empty = () => <DownloadButton data={demoData}/>

const demoData = [
    {
        id: '1',
        displayName: 'Jeff Bob',
        givenName: 'Jeff',
        surname: 'Bob',
        department: 'Department 01',
        userType: 'Member',
        accountEnabled: true
    },
    {
        id: '2',
        displayName: 'Mister Flibble',
        givenName: 'Mister',
        surname: 'Flibble',
        department: 'Department 02',
        userType: 'Member',
        accountEnabled: true
    },
    {
        id: '3',
        displayName: 'Captain underpants',
        givenName: 'Captain',
        surname: 'Underpants',
        department: 'Department 02',
        userType: 'Member',
        accountEnabled: true
    },
    {
        id: '4',
        displayName: 'Jeffrey Bobbery',
        givenName: 'Jeffrey',
        surname: 'Bobbery',
        department: 'Department 01',
        userType: 'Member',
        accountEnabled: true
    },
    {
        id: '5',
        displayName: 'Jeff Bob',
        givenName: 'Jeff',
        surname: 'Bob',
        department: 'Department 05',
        userType: 'Member',
        accountEnabled: true
    },
]
