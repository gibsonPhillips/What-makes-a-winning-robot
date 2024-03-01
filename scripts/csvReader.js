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
export async function processData(){
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
        var finalData = {}
        // Gets the information needed for the drive
        for (const key in processedData) {
            if (processedData.hasOwnProperty(key)) {
              tempData = splitData(processedData[key],"Drive");
              finalData[key] = getDriveInfo(tempData);
              
            }
        }
        // Gets the information for each individual weapon
        for (const key in finalData){
            finalData[key] = getWeaponInfo(finalData[key]);
        }
        return finalData;
          
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
        for (const dp of data[key] ){
            KOs = KOs +  parseInt(dp["KOs"]);
            KOd = KOd + parseInt(dp['KOd']);
            W = W + parseInt(dp['W']);
            L = L + parseInt(dp['L']);
        }
        perc = W/(W+L);
        tempData = {"KOs":KOs,"KOd":KOd,"W":W,"L":L,"perc":perc};
        info[key]=tempData;
    }
    return info;
}

function getWeaponInfo(data){
    var info = {}
    var tempData;
    var KOs = 0;
    var KOd = 0;
    var W = 0;
    var L = 0;
    var perc = 0;
    for (const key in data){
        W = W + parseInt(data[key]["W"]);
        L= L + parseInt(data[key]["L"]);
        KOs = KOs + parseInt(data[key]["KOs"]);
        KOd = KOd + parseInt(data[key]["KOd"]);
    }
    perc = W/(W+L);
    data['Summary'] = {"KOs":KOs,"KOd":KOd,"W":W,"L":L,"perc":perc};
    return data;
}

export async function saveSummaryPercentageForWeapons(weapon, drive, category) {
    try {
        // Wait for the promise to resolve and get the summaryData
        const summaryData = await sortData(weapon, drive, category);

        let perc1, perc2; // Variables to store summary percentages for each weapon
        let weaponCount = 0; // Counter to track the number of weapons iterated

        // Iterate over each weapon in the summaryData
        for (const weaponName in summaryData) {
            if (summaryData.hasOwnProperty(weaponName)) {
                // Access the data for each weapon
                const weaponData = summaryData[weaponName];

                // Access the summary percentage for the weapon
                const summaryPercentage = weaponData.Summary.perc;

                // Store summary percentage for the first weapon
                if (weaponCount === 0) {
                    perc1 = summaryPercentage;
                }
                // Store summary percentage for the second weapon
                else if (weaponCount === 1) {
                    perc2 = summaryPercentage;
                }

                weaponCount++; // Increment weapon count
            }
        }

        console.log('Summary Percentage for perc 11:', perc1);
        console.log('Summary Percentage for perc 22:', perc2);

        // Return perc1 and perc2
        return { perc1, perc2 };
    } catch (error) {
        console.error('Error saving summary percentage:', error);
        throw error;
    }
}


