import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsAbout, selectIsChat, selectIsSettings, selectIsSearch } from "../features/mainContentRoute/mainContentRouteSelectors";
import { setIsAbout, setIsChat, setIsSettings, setIsSearch, clearMainContentRoute } from "../features/mainContentRoute/mainContentRouteSlice";

const useMainContentRouter = () => {

    const dispatch = useAppDispatch();

    const isChat: boolean = useAppSelector(selectIsChat);
    const isSettings: boolean = useAppSelector(selectIsSettings);
    const isSearch: boolean = useAppSelector(selectIsSearch);
    const isAbout: boolean = useAppSelector(selectIsAbout);

    const switchContent = (content: string) => {
        switch(content){
            case "chatRoom":
                dispatch(setIsChat());
                break;
            case "userSettings":
                dispatch(setIsSettings());
                break;
            case "bookSearch":
                dispatch(setIsSearch());
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
        isSettings,
        isSearch,
        isAbout,
        switchContent
    }
}

export default useMainContentRouter;
