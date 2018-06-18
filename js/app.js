///<reference path="jquery-1.10.2.min.js"/>

$(document).on('ready', function () {
	$('.nodes-slider-input').jRange({
		from: config.nodeRangeMin,
		to: config.nodeRangeMax,
		step: 0.5,
		scale: [config.nodeRangeMin,5,config.nodeRangeMax],
		format: '%s',
		width: $('.nodes-slider-input').parent().width(),
		showLabels: true,
		isRange : true,
		onstatechange:function(opt){
			var maxMin = opt.split(',');
			graph.filter.node.min = maxMin[0];
			graph.filter.node.max = maxMin[1];
		}
	});
	$('.edges-slider-input').jRange({
		from: 0,
		to: 10,
		step: 1,
		scale: [0,5,10],
		format: '%s',
		width: $('.edges-slider-input').parent().width(),
		showLabels: true,
		isRange : true,
		onstatechange:function(opt){
			var maxMin = opt.split(',');
			graph.filter.edge.min = maxMin[0];
			graph.filter.edge.max = maxMin[1];
		}
	});
	
    graph.draw();
    $('#test-icon').fontSpy({
        onLoad: function () { if (graph.network == null) graph.draw(); },
        onFail: 'fontFail anotherClass'
    });

	
	//remove node
    // $(document).on('click', '.node-nav > a', function () {
		// let $a = $(this);
		// graph.currentColIdx = data[parseInt($a.data('idx'))];
		// graph.draw();
		// $a.nextAll().remove();
		
    // });
});

var graph = {
    currentColIdx: 0,
	data:{
		nodes: new vis.DataSet(),
		edges: new vis.DataSet()
	},
	options:{},
	filter:{
		node:{
			min:0,
			max:10,
		},
		edge:{
			min:0,
			max:10,
		}
	},
	
    draw: function () {
		this.filterData();
		this.convertData();
        this.init();
    },
    filterData: function () {
		let nodes = data[this.currentColIdx].nodes.filter(x => x.weight >= this.filter.node.min && x.weight <= this.filter.node.max);
		let edges = data[this.currentColIdx].edges.filter(x => x.weight >= this.filter.edge.min && x.weight <= this.filter.edge.max && nodes.find(y => y.id == x.from) != null && nodes.find(y => y.id == x.to) != null);
		if(this.network == null)
		{
			this.data.nodes.add(nodes);
			this.data.edges.add(edges);
			console.log(this.data.nodes);
		}
		else{
			this.remove(...[
				this.data.nodes.filter(x=>nodes.find(y=>y.id == x.id) == null),
				this.data.edges.filter(x=>edges.find(y=>y.id == x.id) == null)
			]);
		}
    },
	remove:function(nodes,edges){
		edges.forEach(e=>{
			this.data.remove({id:e.id});
		});
		nodes.forEach(n=>{
			this.data.remove({id:n.id});
		});
	},
    convertData: function (params) {
        graph.options = {
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
        this.data.nodes.forEach(function (x) {
            x['group'] = 'fa_icon' + x.id;
			if(x.labelColor)
				x.font.color = x.labelColor;
			if(!graph.options.groups.hasOwnProperty(x.group))
			{
				graph.options.groups[x.group] = {
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: x.icon,
                    size: (x.weight * 10),
                    color: x.color
                }
            };
			}

        });
        this.data.edges = this.data.edges.map(x => ({
			id:x.id,
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

    },
    network: null,
    init: function () {
		console.log(this.data);
        var container = document.getElementById('graph');
        this.network = new vis.Network(container, this.data, this.options);
        //this.network.fit();
		 this.network.on('hoverNode', function (params2) {
			 let node = graph.data.nodes.find(x => x.id == params2.node);
			 if(node.subCol!=null){
				 graph.network.canvas.body.container.style.cursor = 'pointer';
			 }
		});
		this.network.on('blurNode', function (params2) {
			 let node = graph.data.nodes.find(x => x.id == params2.node);
			 if(node.subCol != null){
				 graph.network.canvas.body.container.style.cursor = 'default';
			 }
		});
        this.network.on("selectNode", function (params2) {
            let node = graph.data.nodes.find(x => x.id == params2.nodes[0]);
			let edges = data[graph.currentColIdx].edges.filter(x=>(x.from == node.id || x.to == node.id) && graph.data.edges.find(y=>y.id == x.id) == null);
			console.log(edges);
			let nodes = data[graph.currentColIdx].nodes.filter(x=>edges.find(y=>y.from == x.id || y.to == x.id) !=null && graph.data.nodes.find(y=>y.id != x.id) == null);
			nodes.forEach(x=>{
				x.font.color = x.labelColor;
				graph.data.nodes.add(x);
				if(!graph.options.groups.hasOwnProperty(x.group))
				{
					graph.options.groups[x.group] = {
					shape: 'icon',
					icon: {
						face: 'FontAwesome',
						code: x.icon,
						size: (x.weight * 10),
						color: x.color
						}
					};
				}

			});
			edges.map(x => ({
				id:x.id,
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
			})).forEach(x=>{
				graph.data.edges.add(x);
			});
			// if(node.subCol!=null){
				// graph.currentColIdx = node.subCol;
				// graph.draw();
				// $('.node-nav').append('<span>-</span> <a data-idx="'+node.subCol+'">'+node.label+'</a>')
			// }
        });
    }
};
