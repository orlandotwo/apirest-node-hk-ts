const getCurrentDate = (): { date: Date, currentDate: string, currentTime: string, currentNumberDate: number } => {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toTimeString();
    const currentNumberDate = Date.now() / 1000;

    const resp = {
        date,
        currentDate,
        currentTime,
        currentNumberDate
    };
    return resp;
}

export { getCurrentDate };