import dayjs from "dayjs";


export const FORMAT_DATE_MMDDYYYHHmm = "MM/DD/YYYY HH:mm";
export const FORMAT_DATE_YYYY_MM_DD_HH_mm = "YYYY-MM-DD HH:mm";

const formatterDate = (date: Date, format: string): string => {
    return dayjs(date).format(format);
}


const dateEstPosterieureOuEgaleADateDuJour = (dateIntervention: Date | undefined): boolean => {
    return dateIntervention !== undefined && new Date(dateIntervention).getTime() >= new Date().getTime();
}

const dateService = {
    formatterDate,
    dateEstPosterieureOuEgaleADateDuJour
}

export default dateService;