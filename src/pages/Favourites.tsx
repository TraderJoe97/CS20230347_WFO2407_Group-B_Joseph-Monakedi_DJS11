
import { RootState } from "@/store/store";
// import { removeFavourite, ClearAllFavourates } from "@/store/FavouritesSlice";
import { useSelector } from "react-redux";


export default function Favourites() {
    const favourites = useSelector((state: RootState) => state.favourites);
    
    return(
        <p className="break-all ">{JSON.stringify(favourites)}</p>
    )
}