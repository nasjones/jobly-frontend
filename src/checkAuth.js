import { useContext } from "react";
import UserContext from "./UserContext";

function useCheckAuth(status) {
	const { user } = useContext(UserContext);
	if (!!user !== status) return false;
	return true;
}

export default useCheckAuth;
