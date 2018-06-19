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
			if(graph.network!=null)
			{
				graph.remove();
				graph.add();
			}

		}
	});
	$('.edges-slider-input').jRange({
		from: 0,
		to: 10,
		step: 1,
		scale: [config.edgeRangeMin,5,config.edgeRangeMax],
		format: '%s',
		width: $('.edges-slider-input').parent().width(),
		showLabels: true,
		isRange : true,
		onstatechange:function(opt){
			var maxMin = opt.split(',');
			graph.filter.edge.min = maxMin[0];
			graph.filter.edge.max = maxMin[1];
			if(graph.network!=null)
			{
				graph.remove();
				graph.add();
			}
		}
	});
    $('#test-icon').fontSpy({
        onLoad: function () { 
			if (graph.network == null) 
			{
				var fData = graph.filterData();
				graph.appendData(fData.nodes,fData.edges);
				graph.init();
			}			
		},
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
	network: null,
    currentColIdx: 0,
	data:{
		nodes: new vis.DataSet(),
		edges: new vis.DataSet()
	},
	options:{
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
    },
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
    filterData: function () {
		return {
			nodes:data[this.currentColIdx].nodes.filter(x => x.weight >= this.filter.node.min && x.weight <= this.filter.node.max),
			edges:data[this.currentColIdx].edges.filter(x => x.weight >= this.filter.edge.min && x.weight <= this.filter.edge.max)
		};
    },
	add:function(){
		let nodes = data[this.currentColIdx].nodes.filter(x => x.weight >= this.filter.node.min && x.weight <= this.filter.node.max && graph.data.nodes.getIds().find(y=>y == x.id) == null);
		let edges = data[this.currentColIdx].edges.filter(x => x.weight >= this.filter.edge.min && x.weight <= this.filter.edge.max && graph.data.edges.getIds().find(y=>y == x.id) == null);
		graph.appendData(nodes,edges);
	},
	remove:function(){
		let nodes = data[this.currentColIdx].nodes.filter(x => x.weight < this.filter.node.min || x.weight > this.filter.node.max);
		let edges = data[this.currentColIdx].edges.filter(x => x.weight < this.filter.edge.min || x.weight > this.filter.edge.max || nodes.find(y => y.id == x.from) != null || nodes.find(y => y.id == x.to) != null);
		edges.forEach(e=>{
			try{
				this.data.edges.remove({id:e.id});
			}
			catch(err){
			}
			
		});
		console.log(nodes);
		nodes.forEach(n=>{
			try{
				this.data.nodes.remove({id:n.id});
			}
			catch(err){
			}
			
		});
	},
    appendData: function (nodes,edges) {
        nodes.forEach(function (x) {
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
        edges = edges.map(x => ({
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
		console.log(nodes);
		this.data.nodes.add(nodes);
		this.data.edges.add(edges);
    },
    init: function () {
		console.log(this.data);
        var container = document.getElementById('graph');
        this.network = new vis.Network(container, this.data, this.options);
        //this.network.fit();
		 this.network.on('hoverNode', function (params2) {
			 let node = data[graph.currentColIdx].nodes.find(x => x.id == params2.node);
			 if(node.subCol!=null){
				 graph.network.canvas.body.container.style.cursor = 'pointer';
			 }
		});
		this.network.on('blurNode', function (params2) {
			 let node = data[graph.currentColIdx].nodes.find(x => x.id == params2.node);
			 if(node.subCol != null){
				 graph.network.canvas.body.container.style.cursor = 'default';
			 }
		});
        this.network.on("selectNode", function (params2) {
            let node = data[graph.currentColIdx].nodes.find(x => x.id == params2.nodes[0]);
			let edges = data[graph.currentColIdx].edges.filter(x=>(x.from == node.id || x.to == node.id) && graph.data.edges.getIds().find(y=>y == x.id) == null);
			console.log(edges);
			let nodes = data[graph.currentColIdx].nodes.filter(x=>edges.find(y=>y.from == x.id || y.to == x.id) !=null && graph.data.nodes.getIds().find(y=>y != x.id) == null);
			graph.appendData(nodes,edges);
			
        });
    }
};
