export const logout = () => {
		localStorage.removeItem('user_token');
		localStorage.removeItem('modulo');
		return {
			type: "LOGOUT_SUCESS"
		}
}