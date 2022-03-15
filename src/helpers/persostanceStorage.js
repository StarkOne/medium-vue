export const getItem = (key) => {
    try {
        return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
        console.log('Error getting data from localStorage', error);
        return null;
    }
};

export const setItem = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log('Error saving data from localStorage', error);
    }
};
