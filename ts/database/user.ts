class User {
  uuid: string;
  minecraftUsername: string;
  nationAffiliation: string;
  location: string;
  reviewsJson: string;
  itemsSold: number;
  creation: number;

  constructor(
    uuid: string,
    minecraftUsername: string,
    nationAffiliation: string,
    location: string,
    reviewsJson: string,
    itemsSold: number,
    creation: number
  ) {
    this.uuid = uuid;
    this.minecraftUsername = minecraftUsername;
    this.nationAffiliation = nationAffiliation;
    this.location = location;
    this.reviewsJson = reviewsJson;
    this.itemsSold = itemsSold;
    this.creation = creation;
  }
}


async function fetchUser(uuid: string): Promise<Result<User>> {
    const result = new Result<User>(false, "An unhandled error occured.", null);

    const url = `https://localhost/api/v1/user/fetch/${uuid}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const user:User = deserialize<User>(data.value, User);


        result.success = true;
        result.message = "OK.";
        result.value = user;

    } catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }

    return result;
}