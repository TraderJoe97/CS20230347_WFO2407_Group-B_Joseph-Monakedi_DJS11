/**
 * Format a time in seconds into a string in the format 'HH:MM:SS'
 *
 * @param {number | null | undefined} timeInSeconds - The time in seconds to be formatted
 * @returns {string} - The formatted time string
 */
export const formatTime = (timeInSeconds: number | null | undefined): string => {
    if (timeInSeconds === null || timeInSeconds === undefined) {
        return '00:00:00';
    }

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
