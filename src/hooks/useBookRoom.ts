import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setBookRoom } from "../features/bookRoom/bookRoomSlice";
import { selectBookRoom } from "../features/bookRoom/bookRoomSelectors";

const useBookRoom = () => {

    const bookRoom: string = useAppSelector(selectBookRoom);
    const dispatch = useAppDispatch();
    
    const handleSetBookRoom = (room: string) => {
        dispatch(setBookRoom({bookRoom: room}));
    }

  return { bookRoom, handleSetBookRoom }
}

export default useBookRoom;
