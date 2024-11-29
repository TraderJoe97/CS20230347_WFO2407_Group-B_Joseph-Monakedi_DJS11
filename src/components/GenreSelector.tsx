// renders checkbox group for selecting genre filters
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";

interface GenreSelectorProps {
  genres: { [key: string]: string };
  selectedGenres: Set<string>;
  setSelectedGenres: (genres: Set<string>) => void;
}

export default function GenreSelector({
  genres,
  selectedGenres,
  setSelectedGenres,
}: GenreSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleGenre = (id: string) => {
    const updatedGenres = new Set(selectedGenres);
    if (updatedGenres.has(id)) {
      updatedGenres.delete(id);
    } else {
      updatedGenres.add(id);
    }
    setSelectedGenres(updatedGenres);
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        variant="ghost"
        className="border"
      >
       Filters
      </Button>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="absolute z-100 mt-2 w-64 bg-white  dark:bg-gray-950  rounded-lg shadow-lg p-4">
          {Object.entries(genres).map(([id, name]) => (
            <label
              key={id}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <Checkbox
                checked={selectedGenres.has(id)}
                onCheckedChange={() => toggleGenre(id)}
                id={`genre-${id}`}
              />
              <span className="text-sm">{name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
