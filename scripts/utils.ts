
export const ensureEnvVarsAreNotEmpty = (varsToCheck: string[]) => {

	const unset = varsToCheck.filter(el => !process.env[el])

	if (unset.length > 0) {
		console.error('Ensure these env vars are set', unset)
		process.exit(1)
	}
}