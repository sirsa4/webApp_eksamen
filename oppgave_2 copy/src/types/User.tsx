// export type User = {
//     id: string;
//     gender: string;
//     sport: string;
// }

// export type Customer = {
//     name: string;
// }

// export type Sessions = {
//     sessionId: string;
//     sessionName: string;
//     date: Date;
//     duration: number
// }

// export type Types = {
//     pages: number;
//     success: boolean;
//     hasMore: boolean;
//     page: number;
//     data: []
// }

export type Data = {
    pages: number,
    success: boolean,
    hasMore: boolean,
    page: number,
    data: User[]
}

export type User = {
    id: string,
    userId: string,
    gender: string,
    sport: string,
    data: User[]
    meta: {
        heartrate: number;
        watt: number;
        speed: number;
    }
}

// export type User = {
//     id: string,
//     userId: string,
//     gender: string,
//     sport: string,
//     data: User[]
//     meta: {
//         heartrate: number;
//         watt: number;
//         speed: number;
//     }
// }
export type Activity = {
    date: string;
    goalId?: string;
    name?: string;
    tags?: string[];
    questions: Question[];
    intervals: Interval[];
}

export type Question = {
    id: string;
    question: string;
    type: string;
} 

export type Interval = {
    id: string;
    duration: number;
    intensity: number;
}

