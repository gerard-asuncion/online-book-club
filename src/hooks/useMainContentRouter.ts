import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsWelcome, selectIsChat, selectIsSettings, selectIsSearch } from "../features/mainContentRoute/mainContentRouteSelectors";
import { setIsWelcome, setIsChat, setIsSettings, setIsSearch, clearMainContentRoute } from "../features/mainContentRoute/mainContentRouteSlice";

const useMainContentRouter = () => {

    const dispatch = useAppDispatch();

    const isWelcome: boolean = useAppSelector(selectIsWelcome);
    const isChat: boolean = useAppSelector(selectIsChat);
    const isSettings: boolean = useAppSelector(selectIsSettings);
    const isSearch: boolean = useAppSelector(selectIsSearch);

    const switchContent = (content: string) => {
        switch(content){
            case "welcomeContent":
                dispatch(setIsWelcome());
                break;
            case "chatRoom":
                dispatch(setIsChat());
                break;
            case "userSettings":
                dispatch(setIsSettings());
                break;
            case "bookSearch":
                dispatch(setIsSearch());
                break;
            default:
                dispatch(clearMainContentRoute());
        }
    }

    return {
        isWelcome,
        isChat,
        isSettings,
        isSearch,
        switchContent
    }
}

export default useMainContentRouter;
