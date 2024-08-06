class User {
    constructor(uuid, minecraftUsername, nationAffiliation, location, itemsSold, creation) {
        this.uuid = uuid;
        this.minecraftUsername = minecraftUsername;
        this.nationAffiliation = nationAffiliation;
        this.location = location;
        this.itemsSold = itemsSold;
        this.creation = creation;
    }
}
async function fetchUser(uuid) {
    const result = new Result(false, "An unhandled error occured.", null);
    const url = `https://api.stoako.com/api/v1/user/fetch/${uuid}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        result.success = data.success;
        result.message = data.message;
        result.value = data.value;
    }
    catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }
    return result;
}
async function updateUser(userToUpdate, worldMarketApiKey) {
    const result = new Result(false, "An unhandled error occured.");
    const url = `https://api.stoako.com/api/v1/user/update`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({ User: userToUpdate }),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${worldMarketApiKey}`
            }
        });
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const res = deserialize(data, Result);
        result.success = res.success;
        result.message = res.message;
    }
    catch (error) {
        result.message = error;
        console.error('Error updating user:', error);
    }
    return result;
}
