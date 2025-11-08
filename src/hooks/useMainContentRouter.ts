import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsAbout, selectIsChat, selectIsChatHistorial, selectIsSettings, selectIsSearch } from "../features/mainContentRoute/mainContentRouteSelectors";
import { setIsAbout, setIsChat, setIsChatHistorial, setIsSettings, setIsSearch, clearMainContentRoute } from "../features/mainContentRoute/mainContentRouteSlice";

const useMainContentRouter = () => {

    const dispatch = useAppDispatch();

    const isChat: boolean = useAppSelector(selectIsChat);
    const isChatHistorial: boolean = useAppSelector(selectIsChatHistorial);
    const isSettings: boolean = useAppSelector(selectIsSettings);
    const isSearch: boolean = useAppSelector(selectIsSearch);
    const isAbout: boolean = useAppSelector(selectIsAbout);

    const switchContent = (content: string) => {
        switch(content){
            case "chatRoom":
                dispatch(setIsChat());
                break;
            case "chatHistorial":
                dispatch(setIsChatHistorial());
                break;
            case "userSettings":
                dispatch(setIsSettings());
                break;
            case "bookSearch":
                dispatch(setIsSearch());
                break;
            case "chatHistorial":
                dispatch(setIsChatHistorial());
                break;
            case "aboutSection":
                dispatch(setIsAbout());
                break;
            default:
                dispatch(clearMainContentRoute());
        }
    }

    return {
        isChat,
        isChatHistorial,
        isSettings,
        isSearch,
        isAbout,
        switchContent
    }
}

export default useMainContentRouter;
