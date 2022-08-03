import axios from 'axios';

//Fetch API data to set all needed states
 const getAPIData = async () => {
    const apiData = {};
    apiData['error'] = [];

    await axios.get(`http://localhost:3001/api/menu`)
        .then(res => {
            apiData['menu'] = res.data.options;
        })
        .catch(error => {
            console.log("Error fetching API: ", error);
            apiData['error'].push(error); 
        });
    await axios.get(`http://localhost:3001/api/sections`)
        .then(res => {
            const sectionList = {};

            res.data.forEach(section => {
                sectionList[section._id] = section;
            });

            apiData['sections'] = sectionList;
        })
        .catch(error => {
            console.log("Error fetching API: ", error);
            apiData['error'].push(error); 
        });
    await axios.get(`http://localhost:3001/api/items`)
        .then(res => {
            const itemsList = {};

            res.data.forEach(item => {
                itemsList[item._id] = item;
            });

            apiData['items'] = itemsList;
        })
        .catch(error => {
            console.log("Error fetching API: ", error);
            apiData['error'].push(error); 
        });

    return apiData;
}


export default getAPIData;
