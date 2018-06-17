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
            weight: 2.1,
            icon: '\uf192',
            color: 'green',
            parentCol: null,
            subCol: null,
        },
    ],
    //لطفا یال ها را مطابق الگو مشخص نمایید
    edges: [
        { from: 0, to: 1,label:'یال اول', weight: 1, color: '#000000' },
        { from: 0, to: 2,label:'یال دوم', weight: 1.6, color: '#000000' },
        { from: 1, to: 2,label:'یال سوم', weight: 1.1, color: '#000000' },
        { from: 3, to: 2,label:'یال چهارم', weight: 1.2, color: '#000000' },
        { from: 3, to: 1,label:'یال پنجم', weight: 1.4, color: '#000000' },
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
        { from: 0, to: 1,label:'یال اول', weight: 1, color: '#000000' },
    ]
};

//
var data = [col0, col1];

