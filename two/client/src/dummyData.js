export const Users = [
    { "_id":"61e6d1fafde6ac7f359ff3cd",
    "username":"AYO",
    "name":"ASEAN Youth Organization",
    "email":"aseanyouthorganization@gmail.com",
    "password":"$2b$10$BpZb0WZZEB6XmEpA6GGOJeNiWxQN7KTjPPybhbkzE4c8YzaYcNG7G",
    "profilePicture":"",
    "coverPicture":"",
    "nation":"",
    "interest":"",
    "division":"",
    "followers":[],
    "followings":[],
    "isAdmin":true,
    "createdAt": "2022-01-18T14:43:06.609+00:00",
    "updatedAt": "2022-01-18T14:43:06.609+00:00",
    "__v":0},

    {
        _id: "61de29560af9e91e13017b20",
        username: "sean_khan",
        name: "Sean Khan",
        email: "sean_khan@yahoo.com",
        password: "$2b$10$S4cCo9wE.lKHA1CgRXrslO78Oh7newG5Ie/gC1WMW2G98JKHyh/De",
        profilePicture: "",
        coverPicture: "",
        "nation":"",
        "interest":"",
        "division":"",
        followers: [],
        followings: [],
        isAdmin: false,
        createdAt: "2022-01-12T01:05:26.467+00:00",
        updatedAt: "2022-01-12T04:54:26.159+00:00",
        __v:0
    },
    {
        _id: "61de2d53b2f02da4f54a8205",
        username: "mat_alex",
        name: "Matius Alex",
        email: "mat_alex@gmail.com",
        password: "$2b$10$t3n7mjyWfyFqlYwm6xgh2.wHIP46ng37FpVSYTEd.QVCVdpcrcEpy",
        profilePicture: "",
        coverPicture: "",
        "nation":"",
        "interest":"",
        "division":"",
        followers: [],
        followings: [],
        isAdmin: false,
        createdAt: "2022-01-12T01:22:27.558+00:00",
        updatedAt: "2022-01-12T04:54:26.109+00:00",
        __v:0
    }
]

export const Posts = [
    {
        _id: "61de5ac228c6bdee1640eba5",
        userId: "61de29560af9e91e13017b20",
        caption: "Hi, don't forget we will have a meeting on Thursday at 2PM! Gmeet link...",
        image: "image.png",
        likes: [],
        createdAt: "2022-01-12T04:36:18.767+00:00",
        updatedAt: "2022-01-12T04:37:51.219+00:00",
        __v: 0
    },
    {
        _id: "61de5eb211cf70001cf33a46",
        userId: "61de29560af9e91e13017b20",
        caption: "Hi, don't forget to come to tomorrow event at 3 PM!",
        image: "image2.png",
        likes: [],
        createdAt: "2022-01-12T04:53:06.152+00:00",
        updatedAt: "2022-01-12T04:53:06.152+00:00",
        __v: 0
    },
    {
        _id: "61de5eea11cf70001cf33a49",
        userId: "61de2d53b2f02da4f54a8205",
        caption: "This is the recap of yesterday event!",
        image: "image3.png",
        likes: [],
        createdAt: "2022-01-12T04:54:02.472+00:00",
        updatedAt: "2022-01-12T04:54:02.472+00:00",
        __v: 0
    }
]