import { useDispatch, useSelector } from "react-redux"
import { resetLoaderRequset, selectedIsLoading, setIsLoading } from "../../redux/LoaderReducer"

const useLoadingHooks = () => {
    const dispatch = useDispatch()
    const setLoading = useSelector(selectedIsLoading)

    const showLoader = () => {
        dispatch(setIsLoading(true))
    };

    const hideLoader = () => {
        dispatch(setIsLoading(false))
    };

    const resetLoader = () => {
        dispatch(resetLoaderRequset());
    };
    
    return { setLoading, showLoader, hideLoader, resetLoader }
}

export default useLoadingHooks