import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearBookRoom, setBookRoom } from "../features/bookRoom/bookRoomSlice";
import { selectBookRoom } from "../features/bookRoom/bookRoomSelectors";

const useBookRoom = () => {

    const bookRoom: string | null = useAppSelector(selectBookRoom);
    const dispatch = useAppDispatch();
    
    const handleSetBookRoom = (room: string) => {
      dispatch(setBookRoom({bookRoom: room}));
    }

    const handleClearBookRoom = () => {
      dispatch(clearBookRoom());
    }

  return { bookRoom, handleSetBookRoom, handleClearBookRoom }
}

export default useBookRoom;
