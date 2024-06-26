import { useState } from "react";
import toast from "react-hot-toast";
const useSignup = () => {
	const [loading, setLoading] = useState(false);

	const signup = async ({ fullname, username, password, confirmPassword, email }) => {
		const success = handleInputErrors({ fullname, username, password, confirmPassword, email });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/authen/users/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullname, username, password, confirmPassword, email }),
			});

			const data = await res.json();
			if (data.error) {
                throw new Error(data.error);
			}
            console.log(data);
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullname, username, password, confirmPassword, email }) {
	if (!fullname || !username || !password || !confirmPassword || !email) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}