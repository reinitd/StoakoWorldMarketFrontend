import { Result } from "../result";
import { formatUnixTime } from "../helpers";
import { User } from "../database/user";
import { fetchUser } from "../database/user";


export async function populateUserInfo(uuid:string) : Promise<Result<User>> {
    let result =  new Result<User>(false, "An unhandled error occured.", null);

    const userResult = await fetchUser(uuid);
    if (!userResult.success) {
        result.message = userResult.message;
        return result;
    }

    const user = userResult.value;
    result.value = user;

    document.querySelectorAll('.js-username-here').forEach(element => {
        element.innerHTML = user.minecraftUsername;
    });
    document.querySelectorAll('.js-uuid-here').forEach(element => {
        element.textContent = user.uuid;
    });

    document.querySelectorAll('.js-joindate-here').forEach(element => {
        element.textContent = formatUnixTime(user.creation);
    });

    document.querySelectorAll('.js-nation-affiliation-here').forEach(element => {
        element.textContent = user.nationAffiliation;
    });

    document.querySelectorAll('.js-items-sold-here').forEach(element => {
        element.textContent = user.itemsSold.toString();
    });

    document.querySelectorAll('.js-location-here').forEach(element => {
        element.textContent = user.location;
    });

    document.querySelectorAll('.js-user-link-here').forEach(element => {
        const a = document.createElement('a');
        a.href = `/user?uuid=${user.uuid}`;
        a.textContent = user.minecraftUsername
        element.appendChild(a);
    });


    result.success = true;
    result.message = "OK.";

    return result;
}