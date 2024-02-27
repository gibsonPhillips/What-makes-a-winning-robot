// Reads the csv file and returns a promise that resolves with the CSV data
function readData() {
    return fetch('scripts/CombatData.csv')
        .then(response => response.text())
        .catch(error => {
            console.error('Error:', error);
            throw error; // Re-throw the error to be caught later
        });
}

// Turns the data into an array
async function processData(){
    try {
        const csvData = await readData(); // Wait for the promise to resolve
        return parseCSV(csvData); // Parse the CSV data
    } catch (error) {
        console.error('Error processing data:', error);
        throw error; // Re-throw the error to be caught later
    }
}


function parseCSV(csv) {
    const lines = csv.split(/\r?\n/); // Split lines using regex to handle \r\n or \n
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = values[j];
            }
            data.push(obj);
        }
    }

    return data;
}


// Sorts the array based on the data in it
export async function sortData(weapon, drive, category) {
    try {
        const data = await processData();
        const weaponData = data.filter(obj=> weapon.includes(obj.Weapon));
        const categoryData = weaponData.filter(obj=> category.includes(obj.Category));
        const driveData = categoryData.filter(obj=> drive.includes(obj.Drive));

        const processedData = splitData(driveData,"Weapon");
        var tempData;
        for (const key in processedData) {
            if (processedData.hasOwnProperty(key)) {
              tempData = splitData(processedData[key],"Drive");

              return getDriveInfo(tempData);
            }
        }
          
    } catch (error) {
        console.error('Error sorting data:', error);
        throw error; // Re-throw the error to be caught later
    }
}

function splitData(data,cat){
    return data.reduce((categories, item) => {
        const category = item[cat];
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(item);
        return categories;
    }, {});
}

// Gets Drive Information
function getDriveInfo(data){
    var info = {};
    var tempData;
    for (const key in data){
        var KOs = 0;
        var KOd = 0;
        var W = 0;
        var L = 0;
        var perc = 0;
        var N = 0;
        for (const dp of data[key] ){
            KOs = KOs +  parseInt(dp["KOs"]);
            KOd = KOd + parseInt(dp['KOd']);
            W = W + parseInt(dp['W']);
            L = L + parseInt(dp['L']);
            N = N+1;
        }
        perc = W/(W+L);
        tempData = {"KOs":KOs,"KOd":KOd,"W":W,"L":L,"perc":perc}
        info[key]=tempData;
    }
    return info;
}


