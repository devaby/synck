module.exports = {

	'name': 'timAgitMhiMSSQLConverter',

	'batch': 100,

	'table': {

		'from': {
			
			'name': 'dbo.t_perioda',
			'column': ['id'],
			'function': {

				'count': function(callback) {
					
					callback(null, 2)

				},
				
				all : function(callback) {

					callback(null, [

					    {

					        name : "Trina Friesen",
					        email : "mann.anika@example.net"

					    },
					    {

					        name : "Burney O'Kon",
					        email : "ivy.rohan@example.org"

					    },
					    {

					        name : "Dr. Junius Rogahn",
					        email : "schamberger.rickie@example.com"

					    },
					    {

					        name : "Jiles Jakubowski",
					        email : "daniela70@example.org"

					    },
					    {

					        name : "Kipp Rice",
					        email : "gulgowski.devyn@example.com"

					    },
					    {

					        name : "Woodrow Wolf",
					        email : "jacque03@example.net"

					    },
					    {

					        name : "Cason Botsford",
					        email : "almeda81@example.net"

					    },
					    {

					        name : "Mr. Halley Ryan",
					        email : "raquan44@example.net"

					    },
					    {

					        name : "Lilburn Weissnat",
					        email : "deonta88@example.com"

					    },
					    {

					        name : "Jerrad Schuppe",
					        email : "bhudson@example.com"

					    },

					])

				},

				'condition': function(){

				}
			
			}
		
		},

		'to':{

			'name': 'dbo._toll_boothtasks',
			'column': ['id'],
			'function': {

				'count': function(callback){

					callback(null, 1)

				},

				all : function(callback){

					callback(null, [

	                    {

	                        name : "Trina Friesen",
	                        email : "mann.anika@example.net"

	                    },
	                    
	                    {

	                        name : "Dr. Junius Rogahn",
	                        email : "schamberger.rickie@example.com"

	                    },
	                    
	                    {

	                        name : "Kipp Rice",
	                        email : "gulgowski.devyn@example.com"

	                    },
	                    
	                    {

	                        name : "Cason Botsford",
	                        email : "almeda81@example.net"

	                    },
	                    
	                    {

	                        name : "Lilburn Weissnat",
	                        email : "deonta88@example.com"

	                    },
	                    

	                ])

				},

				'condition': function(){

				},

				insert : function(data, callback) {

					console.log('ini callback dari config', data)

					data.test = 'awidin'

					callback(null, data)

				}

			}

		}

	}

}