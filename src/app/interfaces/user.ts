export interface User {
    gender: string;
    name?: {
        title?: string;
        first?: string;
        last?: string;
    };
    location?: {
        city: string;
        country: string;
    };
    email: string;
    dob: {
        date?: string;
        age?: number
    };
    registered?: {
        date?: string;
        age?: number;
    }
    phone?: number;
    picture?: {
        large?: string;
        medium?: string;
        thumbnail?: string;
    }
}
