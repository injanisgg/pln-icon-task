import axios from "axios";

const BASE_URL_UNIT_ROOMS = 'https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data';
const BASE_URL_KONSUMSI_SUMMARY = 'https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data';

export const getUnits = async () => {
    const res = await axios.get(`${BASE_URL_UNIT_ROOMS}/masterOffice`);
    return res.data;
}

export const getRooms = async () => {
    const res = await axios.get(`${BASE_URL_UNIT_ROOMS}/masterMeetingRooms`);
    return res.data;
}

export const getJenisKonsumsi = async () => {
    const res = await axios.get(`${BASE_URL_KONSUMSI_SUMMARY}/masterJenisKonsumsi`);
    return res.data;
}

export const getDashboardSummary = async () => {
    const res = await axios.get(`${BASE_URL_KONSUMSI_SUMMARY}/summaryBookings`);
    return res.data;
}