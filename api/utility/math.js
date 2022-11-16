

// create random number
export const randomCode = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}