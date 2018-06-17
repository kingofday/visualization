///<reference path="jquery-1.10.2.min.js"/>

$(document).on('ready', function () {
    graph.draw();
    $('#test-icon').fontSpy({
        onLoad: function () { if (graph.network == null) graph.draw(); },
        onFail: 'fontFail anotherClass'
    });

	
	//remove node
    $(document).on('click', '.node-nav > a', function () {
		let $a = $(this);
		graph.currentCol = data[parseInt($a.data('idx'))];
		graph.draw();
		$a.nextAll().remove();
		
    });
});

var graph = {
    currentCol: data[0],
    draw: function () {
        this.fire(this.convertData(this.filterData()));
    },
    filterData: function () {
        let nodes = this.currentCol.nodes.filter(x => x.weight >= $('#nodeMin').val() && x.weight <= $('#nodeMax').val());
        let edges = this.currentCol.edges.filter(x => x.weight >= $('#edgeMin').val() && x.weight <= $('#edgeMax').val() && nodes.find(y => y.id == x.from) != null && nodes.find(y => y.id == x.to) != null);
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
                    size: config.nodeLabelFontSize,
                    //color: '#929292'
					color:config.nodeLabelColor,
					face:"iransans"
                },
                borderWidth: 2
            },
            edges: {
                width: 2
            },
			interaction:{hover:true},
            groups: {}
        };
        params.nodes.forEach(function (x) {
            x['group'] = 'fa_icon' + x.id;
			if(x.labelColor)
				x.font.color = x.labelColor;
            options.groups[x.group] = {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: x.icon,
                    size: (x.weight * 10),
                    color: x.color
                }
            };
        });
        let edges = params.edges.map(x => ({
            from: x.from,
            to: x.to,
            value: x.weight,
            color: { color: x.color, hover: config.edgesHoverColor, highlight: config.edgesHoverColor },
            scaling: {
                max: 9
            },
			label:x.label+"-"+x.weight,
			font:{
				face:"iransans",
				size:config.edgeslabelFontSize
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
        //this.network.fit();
		 this.network.on('hoverNode', function (params2) {
			 let node = params.data.nodes.find(x => x.id == params2.node);
			 if(node.subCol!=null){
				 graph.network.canvas.body.container.style.cursor = 'pointer';
			 }
		});
		this.network.on('blurNode', function (params2) {
			 let node = params.data.nodes.find(x => x.id == params2.node);
			 if(node.subCol != null){
				 graph.network.canvas.body.container.style.cursor = 'default';
			 }
		});
        this.network.on("selectNode", function (params2) {
            let node = params.data.nodes.find(x => x.id == params2.nodes[0]);
			if(node.subCol!=null){
				graph.currentCol = data[node.subCol];
				graph.draw();
				$('.node-nav').append('<span>-</span> <a data-idx="'+node.subCol+'">'+node.label+'</a>')
			}
        });
    }
};
