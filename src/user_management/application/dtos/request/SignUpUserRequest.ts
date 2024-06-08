export class SignUpUserRequest {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    address: string;

    constructor(email: string, password: string, name: string, lastname: string, phoneNumber: string, address: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastname;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}