import { useState, useEffect, useRef } from 'react';
import { socket } from '@/socket/socket';

export function BuildDateAndTime() 
{
    const [timeData, SetTimeData] = useState({ day: '', date: '', time: '' });
    const animationFrameRef = useRef(null);

    useEffect(() => 
    {
        UpdateTime(SetTimeData, animationFrameRef);

        return () => 
        {
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return timeData;
}

export function ActiveSessions() 
{
    const [sessions, SetSessions] = useState(0);

    useEffect(() => {
        socket.on('active-sessions', SetSessions);

        return () => { socket.off('active-sessions', SetSessions); };
    }, []);

    return sessions;
}

function UpdateTime(setTimeData, animationFrameRef) 
{
    const now = new Date();
    const locale = navigator.language || 'ru-RU';    
    const dayRaw = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(now);
    const day = dayRaw.charAt(0).toUpperCase() + dayRaw.slice(1);
    const date = new Intl.DateTimeFormat(locale, { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    }).format(now);
    const time = new Intl.DateTimeFormat(locale, { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    }).format(now);

    setTimeData({ day, date, time });
    
    animationFrameRef.current = requestAnimationFrame(() => UpdateTime(setTimeData, animationFrameRef));
}