///<reference path="jquery-1.10.2.min.js"/>

$(document).on('ready', function () {
    graph.draw();
    $('#test-icon').fontSpy({
        onLoad: function () { if (graph.network == null) graph.draw(); },
        onFail: 'fontFail anotherClass'
    });

    //add new node
    $(document).on('click', '#btn-filter', function () {
        graph.draw();
        //let l = $('#label').val(), w = $('#node-weight').val(), i = $('#icon').val(), c = $('#color').val();
        //if (l == '') {
        //    alert('please type a label for node.');
        //    return;
        //}
        //id++;
        //nodes.push({
        //    id: id,
        //    label: l,
        //    weight: w,
        //    icon: (i == '' ? '\f192' : i),
        //    color: (c == '' ? '#000000' : c)
        //});

        //createNodeRows();
    });
    //remove node
    $(document).on('click', '.nodes .remove', function () {
        let idx = $('.nodes tbody > tr').index($(this).closest('tr'));

    });
});

//var createNodeRows = function () {
//    $('.nodes tbody').html(nodes.map((node, idx) =>('<tr>' +
//            '<td>' + idx + '</td>' +
//            '<td>' + node.label + '</td>' +
//            '<td>' + node.weight + '</td>' +
//            '<td>' + node.icon + '</td>' +
//            '<td>' + node.color + '</td>' +
//            '<td class="remove"><i class="fa fa-times"></i></td>' +
//            '</tr>')));
//};
//var initEdgeSelector = function () {
//    let $opts = nodes.map((node, idx) =>('<option value="' + node.id + '">' + node.label + '</option>'));
//    $('#from').html($opts);
//    $('#to').html($opts);
//};

//var nodes = [
//        { id: 0, label: "0", group: 'source' },
//        { id: 1, label: "1", group: 'icons' },
//        { id: 2, label: "2", group: 'icons' },
//        { id: 3, label: "3", group: 'icons' },
//        { id: 4, label: "4", group: 'icons' },
//        { id: 5, label: "5", group: 'icons' },
//        { id: 6, label: "6", group: 'icons' },
//        { id: 7, label: "7", group: 'icons' },
//        { id: 8, label: "8", group: 'icons' },
//        { id: 9, label: "9", group: 'icons' },
//        { id: 10, label: "10", group: 'mints' },
//        { id: 11, label: "11", group: 'mints' },
//        { id: 12, label: "12", group: 'mints' },
//        { id: 13, label: "13", group: 'mints' },
//        { id: 14, label: "14", group: 'mints' },
//        { id: 15, group: 'dotsWithLabel' },
//        { id: 16, group: 'dotsWithLabel' },
//        { id: 17, group: 'dotsWithLabel' },
//        { id: 18, group: 'dotsWithLabel' },
//        { id: 19, group: 'dotsWithLabel' },
//        { id: 20, label: "diamonds", group: 'diamonds' },
//        { id: 21, label: "diamonds", group: 'diamonds' },
//        { id: 22, label: "diamonds", group: 'diamonds' },
//        { id: 23, label: "diamonds", group: 'diamonds' },
//];
//var edges = [
//    { from: 1, to: 0 },
//    { from: 2, to: 0 },
//    { from: 4, to: 3 },
//    { from: 5, to: 4 },
//    { from: 4, to: 0 },
//    { from: 7, to: 6 },
//    { from: 8, to: 7 },
//    { from: 7, to: 0 },
//    { from: 10, to: 9 },
//    { from: 11, to: 10 },
//    { from: 10, to: 4 },
//    { from: 13, to: 12 },
//    { from: 14, to: 13 },
//    { from: 13, to: 0 },
//    { from: 16, to: 15 },
//    { from: 17, to: 15 },
//    { from: 15, to: 10 },
//    { from: 19, to: 18 },
//    { from: 20, to: 19 },
//    { from: 19, to: 4 },
//    { from: 22, to: 21 },
//    { from: 23, to: 22 },
//    { from: 23, to: 0 },
//]

// create a network
//var container = document.getElementById('graph');
//var data = {
//    nodes: nodes,
//    edges: edges
//};
//var options = {
//    nodes: {
//        shape: 'dot',
//        size: 20,
//        font: {
//            size: 15,
//            color: '#ffffff'
//        },
//        borderWidth: 2
//    },
//    edges: {
//        width: 2
//    },
//    groups: {
//        diamonds: {
//            color: { background: 'red', border: 'white' },
//            shape: 'diamond'
//        },
//        dotsWithLabel: {
//            label: "I'm a dot!",
//            shape: 'dot',
//            color: 'cyan'
//        },
//        mints: { color: 'rgb(0,255,140)' },
//        icons: {
//            shape: 'icon',
//            icon: {
//                face: 'FontAwesome',
//                code: '\uf0c0',
//                size: 50,
//                color: 'orange'
//            }
//        },
//        source: {
//            color: { border: 'white' }
//        }
//    }
//};
//var network = new vis.Network(container, data, options);
var graph = {
    currentNode: data[0],
    draw: function () {
        this.fire(this.convertData(this.filterData()));
    },
    filterData: function () {
        let nodes = this.currentNode.nodes.filter(x => x.weight >= $('#nodeMin').val() && x.weight <= $('#nodeMax').val());
        let edges = this.currentNode.edges.filter(x => x.weight >= $('#edgeMin').val() && x.weight <= $('#edgeMax').val() && nodes.find(y => y.id == x.from) != null && nodes.find(y => y.id == x.to) != null);
        return {
            nodes: nodes,
            edges: edges
        }
    },
    convertData: function (params) {
        let options = {
            nodes: {
                shapeProperties: {
                    interpolation: false
                },
                shape: 'dot',
                size: 20,
                font: {
                    size: 13,
                    color: '#929292'
                },
                borderWidth: 2
            },
            edges: {
                width: 2
            },
            groups: {}
        };
        params.nodes.forEach(function (x) {
            x['group'] = 'fa_icon' + x.id;
            options.groups[x.group] = {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: x.icon,
                    size: (x.weight * 10),
                    color: x.color
                }
            };
            console.log(x);
        });
        let edges = params.edges.map(x => ({
            from: x.from,
            to: x.to,
            value: x.weight,
            color: { color: x.color, highlight: x.color },
            scaling: {
                max: 10
            }
        }));

        return {
            data: {
                nodes: params.nodes,
                edges: edges,
            },
            options: options
        }
    },
    network: null,
    fire: function (params) {
        var container = document.getElementById('graph');
        this.network = new vis.Network(container, params.data, params.options);
        this.network.fit();
        this.network.on("selectNode", function (params2) {
            let node = params.data.nodes.find(x => x.id == params2.nodes[0]);
            graph.currentNode = data[node.subCol];
            graph.draw();
        });
    }
};
