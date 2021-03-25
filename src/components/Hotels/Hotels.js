import {v4 as uuidv4} from 'uuid';
import List from '@material-ui/core/List';
import React, {useEffect, useState} from 'react';
import ListItem from '@material-ui/core/ListItem'
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import useWindowSize from '../../hooks/use-window-size';
import HotelCard from '../HoterlCard/HotelCard';
import {HOTELS_DATA} from '../../static/data';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    listBlock: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        boxShadow: '0px 2px 9px 7px rgba(0,0,0,0.42)',
        width: 'max-content'

    },
    listItem: {
        width: '250px'
    },
    listItemActive: {
        boxShadow: '0px 2px 9px 7px rgba(0,0,0,0.42)',
    },
    activeContainer: {
        background: '#7b7276'
    }
}));


const Hotels = () => {
    const [hotels, setHotels] = useState(() => HOTELS_DATA);
    const [direction, setDirection] = useState('horizontal');
    const [loading, setLoading] = useState(true);

    const {width} = useWindowSize();

    useEffect(() => {
        if(width < 813) {
            setDirection('vertical')
        } else {
            setDirection('horizontal')
        }
    }, [width]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    const onDragEnd = (item) => {
        if (!item.destination) {
            return
        }

        const startIndex = item.source.index;
        const endIndex = item.destination.index;
        const cloneHotels = [...hotels];

        const [movedHotel] = cloneHotels.splice(startIndex, 1);
        cloneHotels.splice(endIndex, 0, movedHotel);
        setHotels(cloneHotels);
    }

    const classes = useStyles();

    return (
        <Container className={classes.mainContainer}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable' direction={direction}>
                    {(provided, snapshot) => (
                        <List
                            className={`${classes.listBlock} ${snapshot.isDraggingOver ? classes.activeContainer: ''}`}
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {provided.placeholder}
                            {hotels.map((hotelItem, index) => (
                                    <Draggable
                                        key={uuidv4()}
                                        draggableId={hotelItem.name}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <ListItem
                                                className={`${classes.listItem} ${snapshot.isDragging ? classes.listItemActive: ''}`}
                                                innerRef={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                <HotelCard hotel={hotelItem} loading={loading}/>
                                            </ListItem>
                                        )}
                                    </Draggable>
                                )
                            )}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </Container>
    );
};

export default Hotels;