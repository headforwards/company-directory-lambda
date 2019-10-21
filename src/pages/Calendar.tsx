import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash'
import config from '../Config';
import { getEvents } from '../utils/MSGraphService';

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types'

// Helper function to format Graph date/time
function formatDateTime(dateTime: Date) {
    return moment.utc(dateTime).local().format('M/D/YY h:mm A');
}

export const Calendar: React.SFC = () => {
    const [eventsData, updateEvents] = useState([])

    // async function componentDidMount() {
    useEffect(() => {
        async function fetchCalendarData() {
            try {
                // Get the user's access token
                var accessToken = await (window as any).msal.acquireTokenSilent({
                    scopes: config.scopes
                });
                // Get the user's events
                var events = await getEvents(accessToken);
                // Update the array of events in state
                updateEvents(events.value);
            }
            catch (err) {
                //showError('ERROR', JSON.stringify(err)); //Aargh, can't figure out how to define the passed function in props
            }
        }
        fetchCalendarData()
    }, [])


    return (
        <article className="pa3 pa5-ns">
            <h1 className="f3 f2-m f1-l center">Calendar</h1>
            <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>
                    <tr>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white" scope="col">Organizer</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white"  scope="col">Subject</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white"  scope="col">Start</th>
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white"  scope="col">End</th>
                    </tr>
                </thead>
                <tbody className="lh-copy">
                    {eventsData.map(
                        function (event: MicrosoftGraph.Event) {
                            return (
                                <tr key={event.id}>
                                    <td className="pv3 pr3 bb b--black-20">{_.get(event,'organizer.emailAddress.name')}</td>
                                    <td className="pv3 pr3 bb b--black-20">{event.subject}</td>
                                    <td className="pv3 pr3 bb b--black-20">{formatDateTime(_.get(event,'start.dateTime'))}</td>
                                    <td className="pv3 pr3 bb b--black-20">{formatDateTime(_.get(event,'end.dateTime'))}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </article>
    );
}

export default Calendar