game_module.factory('gameProfileFactory', ["$http", "$q", function ($http, $q){

	var service = {};

	service.gameInfo = function(username, game_url){

		var def = $q.defer();

		$http.get('http://localhost:3023/games/' + username + '/' + game_url)
			.success(function(data) {
				def.resolve(data);
			})
			.error(function(error, status) {
            	if (status === 404){
            		def.reject(status);
            	}
                def.reject("Some error occur");
			});

		return def.promise;
	};

	service.completeAnAction = function(game_name, action_info){

		var def = $q.defer();

		$http.post('http://localhost:3023/actions', {game_name: game_name, action_info: action_info})
			.success(function(data) {
				def.resolve(data);
			})
			.error(function(error, status) {
				def.reject("Some error occur");
			});

		return def.promise;
	};

	service.createLeaderBoard = function(players, activity){

		var leaderboard = [];
		
		for (var player_count in players){

			leaderboard[player_count] = {name: players[player_count], points : 0};

			for (var activity_count in activity){

				if (activity[activity_count].player === players[player_count]){
					leaderboard[player_count].points = leaderboard[player_count].points + parseInt(activity[activity_count].points);
				}
			}
		}

		return leaderboard;
	};

	service.addCompletedActionToLeaderBoard = function (leaderboard, action_completed){

		for (var player_count in leaderboard){

			if (leaderboard[player_count].name === action_completed.player){
				
				leaderboard[player_count].points += parseInt(action_completed.points);
			}
		}

		return leaderboard;
	};

	service.joinTheGame = function (game_url){
		
		var def = $q.defer();

		$http.post('http://localhost:3023/games/join', {game_url: game_url})
			.success(function(data) {
				def.resolve(data);
			})
			.error(function(error, status) {
                def.reject("Some error occur");
			});

		return def.promise;
	};

	return service;
}]);