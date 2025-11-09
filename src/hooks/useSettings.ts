import { useAppSelector } from '../app/hooks';
import useUserData from './useUserData';
import { selectUserProfilePremium } from '../features/userProfile/userProfileSelectors';

const useSettings = () => {

    const { activatePremiumMode, disablePremiumMode } = useUserData();
    
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const changePremiumStatus = (): void => {
        if(isPremiumUser){
            disablePremiumMode();  
        } else {
            activatePremiumMode();
        }
    }

    return { changePremiumStatus };
};

export default useSettings;