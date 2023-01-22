import { addDays, startOfDay } from "date-fns";

export const getTomorrowMidnight = () => {
    const tommorow = addDays(new Date(), 1);
    const tomorrowMidnight = startOfDay(tommorow);

    return tomorrowMidnight.getTime();
}