export type RegisterFormData = {
	username: string;
	age: number;
	photo: FileList;
	email: string;
	password: string;
	confirmPassword: string;
};

export type LoginFormData = {
	email: string;
	password: string;
};