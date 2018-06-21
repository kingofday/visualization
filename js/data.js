//اولین مجموعه ای که نمایش داده میشود
var col0 = {
    //لطفا گره ها را مطابق الگو مشخص نمایید
    nodes: [
        {
            id: 0,
            label: "احمد",
            weight: 3,
            icon: "\uf192",
            color: 'green',
            parentCol: null,
            subCol: null,
        },
        {
            id: 1,
            label: "ناصر",
            weight: 4,
            icon: "\uf192",
            color: 'green',
            parentCol: null,
            subCol: 1//index of target collection in data array
        },
        {
            id: 2,
            label: "رضا",
            weight: 2,
            icon: '\uf192',
            color: 'green',
            parentCol: null,
            subCol: null,
        },
        {
            id: 3,
            label: "کاظم",
            weight: 7.5,
            icon: '\uf192',
            color: 'green',
            parentCol: null,
            subCol: null,
        },
        {
            id: 4,
            label: "فاطمه",
            weight: 2.1,
            icon: '\uf192',
            color: 'green',
            parentCol: null,
            subCol: null,
        },
        {
            id: 5,
            label: "اکرم",
            weight: 5.1,
            icon: '\uf192',
            color: 'green',
            parentCol: null,
            subCol: null,
        },
        {
            id: 6,
            label: "نیلوفر",
            weight: 6.1,
            icon: '\uf192',
            color: 'green',
            parentCol: null,
            subCol: null,
        }
    ],
    //لطفا یال ها را مطابق الگو مشخص نمایید
    edges: [
        { id:0,from: 0, to: 1,label:'یال اول', weight: 6, color: '#000000' },
        { id:1,from: 0, to: 2,label:'یال دوم', weight: 7, color: '#000000' },
        { id:2,from: 1, to: 2,label:'یال سوم', weight: 3, color: '#000000' },
        { id:3,from: 3, to: 2,label:'یال چهارم', weight: 4.5, color: '#000000' },
        { id:4,from: 3, to: 1,label:'یال پنجم', weight: 4.8, color: '#000000' },
		{ id:5,from: 0, to: 4,label:'یال ششم', weight: 2.5, color: '#000000' },
		{ id:6,from: 0, to: 5,label:'یال هفتم', weight: 3.8, color: '#000000' },
		{ id:7,from: 0, to: 6,label:'یال هشتم', weight: 6.8, color: '#000000' },
    ]
};

//--------------------- level 1 ---------------------------
var col1 = {
    nodes: [
        {
            id: 0,
            label: "امیر",
            weight: 3,
            icon: "\uf192",
            color: 'green',
            parentCol: null,
            subCol: null
        },
        {
            id: 1,
            label: "محمد",
            weight: 3,
            icon: "\uf192",
            color: 'green',
            parentCol: null,
            subCol: null,
        }
    ],
    edges: [
        { id:0,from: 0, to: 1,label:'یال اول', weight: 1, color: '#000000' },
    ]
};

//
var data = [col0, col1];

