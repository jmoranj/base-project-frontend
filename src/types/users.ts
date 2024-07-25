export type RegisterFormData = {
	name: string;
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