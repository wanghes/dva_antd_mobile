
export default {
    'GET /api/users': { users: [1,2] },
    'GET /api/cities':{
	  	status:true,
	  	data:[
	  		{
	  		  city: '成都',
		      temperature: '5',
		      name: '晴'
	  		},{
	  		  city: '广州',
		      temperature: '12',
		      name: '晴'
	  		},{
	  		  city: '北京',
		      temperature: '15',
		      name: '晴'
	  		},{
	  		  city: '天津',
		      temperature: '25',
		      name: '阴'
	  		},{
	  		  city: '上海',
		      temperature: '8',
		      name: '阴'
	  		}
	  	]
    },
    'GET /api/books':{
	  	status:true,
	  	data:[
	  		{
	  		  	id:1,		
	  		  	name: '一千零一夜',
		      	pages: '200',
		      	author: '王海松',
		      	body:"按需加载之后，我们需要让路由动态加载组件，需要将",
		     	publish:"2016-10-21"
	  		},{
	  			id:2,		
	  		  	name: 'javascript权威指南',
		      	pages: '600',
		      	author: '王海松',
		      	body:"这类的代码分拆工具使用的话，一个原本繁琐的构架就会变得更简洁明了",
		      	publish:"2000-01-21"
	  		},{
	  			id:3,	
	  		  	name: 'css禅意花园',
		      	pages: '150',
		      	author: '王海松',
		      	body:"它们都是异步执行，并且只有在需要时才被调用。我们将这种方式称之为 “逐渐匹配”",
		      	publish:"2013-11-01"
	  		}
	  	]
    }
};
