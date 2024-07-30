class Review {
    uuid: string;
    reviewerUuid: string;
    revieweeUuid: string;
    stance: string;
    content: string;
    itemTitle: string;
    creation: number;

    constructor(
        uuid: string,
        reviewerUuid: string,
        revieweeUuid: string,
        stance: string,
        content: string,
        itemTitle: string,
        creation: number
    ) {
        this.uuid = uuid;
        this.reviewerUuid = reviewerUuid;
        this.revieweeUuid = revieweeUuid;
        this.stance = stance;
        this.content = content;
        this.itemTitle = itemTitle;
        this.creation = creation;
    }
}

async function fetchReview(uuid: string): Promise<Result<Review>> {
    const result = new Result<Review>(false, "An unhandled error occured.", null);

    const url = `https://api.stoako.com/api/v1/review/fetch/${uuid}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const user: Review = deserialize<Review>(data.value, Review);


        result.success = true;
        result.message = "OK.";
        result.value = user;

    } catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }

    return result;
}

async function fetchReviewsFromReviewee(revieweeUuid: string): Promise<Result<Review[]>> {
    const result = new Result<Review[]>(false, "An unhandled error occured.", null);

    const url = `https://api.stoako.com/api/v1/review/fetch-from-reviewee/${revieweeUuid}`;
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

    } catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }

    return result;
}

async function fetchReviewsFromReviewer(reviewerUuid: string): Promise<Result<Review[]>> {
    const result = new Result<Review[]>(false, "An unhandled error occured.", null);

    const url = `https://api.stoako.com/api/v1/review/fetch-from-reviewer/${reviewerUuid}`;
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

    } catch (error) {
        result.message = error;
        console.error('Error fetching data:', error);
    }

    return result;
}

async function deleteReview(
    uuid: string,
    worldMarketApiKey: string
): Promise<Result> {
    let result = new Result(false, "An unhandled error occured.");

    const url = `https://api.stoako.com/api/v1/review/create/${uuid}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${worldMarketApiKey}`
            }
        });
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();

        result.success = data.success;
        result.message = data.message;

    } catch (error) {
        result.message = error;
        console.error('Error creating review:', error);
    }

    return result;
}

async function createReview(
    reviewerUuid: string,
    revieweeUuid: string,
    stance: string,
    content: string,
    itemUuid: string,
    worldMarketApiKey: string
): Promise<Result<string>> {
    let result = new Result<string>(false, "An unhandled error occured.", null);

    const url = `https://api.stoako.com/api/v1/review/create`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                ReviewerUuid: reviewerUuid,
                RevieweeUuid: revieweeUuid,
                Stance: stance,
                Content: content,
                ItemUuid: itemUuid
            }),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${worldMarketApiKey}`
            }
        });
        if (!response.ok) {
            result.message = response.status.toString();
            throw new Error(`Http error! Status: ${response.status}`);
        }
        const data = await response.json();

        result.success = data.success;
        result.message = data.message;
        result.value = data.value;

    } catch (error) {
        result.message = error;
        console.error('Error creating review:', error);
    }

    return result;
}