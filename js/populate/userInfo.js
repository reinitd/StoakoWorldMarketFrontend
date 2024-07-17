var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function populateUserInfo(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = new Result(false, "An unhandled error occured.", null);
        const userResult = yield fetchUser(uuid);
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
            a.textContent = user.minecraftUsername;
            element.appendChild(a);
        });
        result.success = true;
        result.message = "OK.";
        return result;
    });
}
