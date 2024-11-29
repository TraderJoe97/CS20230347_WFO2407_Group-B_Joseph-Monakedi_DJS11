import { useDispatch } from "react-redux";
import { ClearAllFavourates } from "@/store/FavouritesSlice";
import { clearAllEpisodesProgress } from "@/store/EpisodesProgressSlice";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const dispatch = useDispatch();

  const handleClearFavourites = () => {
    dispatch(ClearAllFavourates());
  };

  const handleClearProgress = () => {
    dispatch(clearAllEpisodesProgress());
  };

  return (
    <div className="flex flex-col w-fit gap-5">
      {/* Clear Favourites */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Clear All Favourites</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Clear All Favourites</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all your favourites? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel >Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="button"
              onClick={handleClearFavourites}
            >
              Clear Favourites
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear Progress */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Clear All Progress</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Clear All Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all episode progress? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter> 
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearProgress}
            >
              Clear Progress
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}