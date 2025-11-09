import { useAppDispatch, useAppSelector } from "../app/hooks";
import { 
    selectIsAbout, 
    selectIsChat, 
    selectIsChatHistorial, 
    selectIsSettings, 
    selectIsSearch,
    selectIsActiveSearch,
} from "../features/mainContentRoute/mainContentRouteSelectors";
import { selectUserProfilePremium } from "../features/userProfile/userProfileSelectors"
import { 
    setIsAbout, 
    setIsChat, 
    setIsChatHistorial, 
    setIsSettings, 
    setIsSearch, 
    setIsActiveSearch,
    clearMainContentRoute
} from "../features/mainContentRoute/mainContentRouteSlice";

const useMainContentRouter = () => {

    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const dispatch = useAppDispatch();

    const isChat: boolean = useAppSelector(selectIsChat);
    const isChatHistorial: boolean = useAppSelector(selectIsChatHistorial);
    const isSettings: boolean = useAppSelector(selectIsSettings);
    const isSearch: boolean = useAppSelector(selectIsSearch);
    const isActiveSearch: boolean = useAppSelector(selectIsActiveSearch);
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
            case "activeBookSearch":
                if(isPremiumUser) dispatch(setIsActiveSearch());
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
        isActiveSearch,
        isAbout,
        switchContent
    }
}

export default useMainContentRouter;
