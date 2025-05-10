export interface Order {
    id?:        number,
    name:       string,
    price:      number,
    type:       string
}

export interface User {
    email:      string,
    username:   string,
    password:   string,
    role:       string
}