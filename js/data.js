//--------------------- level 1 ---------------------------
var col1 = {
    nodes: [
            {
                id: 0,
                label: "node 00",
                weight: 3,
                icon: "\uf192",
                color: 'green',
                parentCol: null,
                subCol: null
            },
            {
                id: 1,
                label: "node 01",
                weight: 3,
                icon: "\uf192",
                color: 'green',
                parentCol: null,
                subCol: null
            }
    ],
    edges: [
        { from: 0, to: 1, weight: 1, color: '#000000' },
    ]
};

//اولین مجموعه ای که نمایش داده میشود
var col0 = {
    //لطفا گره ها را مطابق الگو مشخص نمایید
    nodes:[
        {
            id: 0,
            label: "node 0",
            weight: 3,
            icon: "\uf192",
            color: 'blue',
            parentCol: null,
            subCol: null
        },
        {
            id: 1,
            label: "node 1",
            weight: 4,
            icon: "\uf192",
            color: 'blue',
            parentCol: null,
            subCol: col1
        },
        {
            id: 2,
            label: "node 2",
            weight: 2,
            icon: '\uf192',
            color: 'blue',
            parentCol: null,
            subCol: null
        },
        {
            id: 3,
            label: "node 3",
            weight: 2.1,
            icon: '\uf192',
            color: 'blue',
            parentCol: null,
            subCol: null
        },
    ],
    //لطفا یال ها را مطابق الگو مشخص نمایید
    edges:[
        { from: 0, to: 1, weight: 1, color: '#000000' },
        { from: 0, to: 2, weight: 1.5, color: '#000000' },
        { from: 1, to: 2, weight: 1.1, color: '#000000' },
        { from: 3, to: 2, weight: 1.2, color: '#000000' },
        { from: 3, to: 1, weight: 1.4, color: '#000000' },
    ]
};

