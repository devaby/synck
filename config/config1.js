module.exports = {

	'name': 'timAgitMhiMSSQLConverter',

	'batch': 100,

	'table': {

		'from': {
			
			'name': 'dbo.t_perioda',
			'column': ['id'],
			'function': {

				'count': function() {
					
					return 2

				},
				
				'condition': function(){

				}
			
			}
		
		},

		'to':{

			'name': 'dbo._toll_boothtasks',
			'column': ['id'],
			'function': {

				'count': function(){

					return 1

				},

				'condition': function(){

				}

			}

		}

	}

}