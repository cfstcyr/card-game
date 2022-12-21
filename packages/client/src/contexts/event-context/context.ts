import React from 'react';
import { Events } from './events';
import { EventEmitter } from '../../utils/event';

type EventContextInterface = EventEmitter<Events>;

const EventContext = React.createContext<EventContextInterface>(
    {} as EventContextInterface,
);

const useEvent = () => React.useContext(EventContext);

export { useEvent, EventContext };
