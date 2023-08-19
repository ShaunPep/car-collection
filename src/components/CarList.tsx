import { styled } from "styled-components";

import { Car } from "../services/car-service";
import Button from "./Button";

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const CarListItem = styled.div<CarListItemProps>`padding: 8px; 
    border-radius: 15px; 
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; 
    background: ${(props) => (props.selected ? "#CCC" : "none")};
    margin: 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;`;

const Actions = styled.div`
    display: flex;
    gap: 8px;
`;

interface CarListItemProps {
    selected: boolean;
}

interface Props {
    items: Car[];
    selectedCar?: Car | null;

    onSelectItem: (item: Car) => void;
    onDeleteItem: (id: string) => void;
}

function CarList({items, selectedCar, onSelectItem, onDeleteItem}: Props) {
    return <List>
        {items.map((item, index) => (<CarListItem selected={item._id === selectedCar?._id} key={item._id}>
            {item.make} - {item.model}
            <Actions>
                <Button onClick={() => onSelectItem(item)}>Edit/View</Button>
                <Button primary={false} onClick={() => onDeleteItem(item._id)}>Delete</Button>
            </Actions>
            </CarListItem>))}
    </List>
}

export default CarList;