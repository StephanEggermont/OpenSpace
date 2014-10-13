angular.module('app')

.controller('DashboardCtrl', ['$scope', '$timeout',
	function($scope, $timeout) {
		$scope.gridsterOptions = {
		    columns: 6,
		        margins: [5, 5],
		    rowHeight: 100,
		    floating: false,
			draggable: {
				handle: 'h5'
			}
		};

		$scope.dashboards = {
			'1': {
				id: '1',
				name: 'Home',
				widgets: []
			}
		};

		$scope.clear = function() {
			$scope.dashboard.widgets = [];
		};

		$scope.addWidget = function() {
			$scope.dashboard.widgets.push({
				name: $scope.presenter,
			    title: $scope.topic,
				sizeX: 1,
				sizeY: 1
			});
		    $scope.presenter = "";
		    $scope.topic = "";
		};

		$scope.addColumn = function() {
			$scope.gridsterOptions.columns = $scope.gridsterOptions.columns+1;
		    $scope.gridster.refresh;
		};

		$scope.removeColumn = function() {
		    $scope.gridsterOptions.columns = Math.max(0,$scope.gridsterOptions.columns-1);
		    $scope.gridster.refresh;
		};

		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.dashboard = $scope.dashboards[newVal];
			} else {
				$scope.dashboard = $scope.dashboards[1];
			}
		});

		// init dashboard
		$scope.selectedDashboardId = '1';

	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function($scope, $modal) {

		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'demo/dashboard/widget_settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};

	}
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
	function($scope, $timeout, $rootScope, $modalInstance, widget) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
		    title: widget.title,
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			col: widget.col,
			row: widget.row
		};

		$scope.sizeOptions = [{
			id: '1',
			name: '1'
		}, {
			id: '2',
			name: '2'
		}, {
			id: '3',
			name: '3'
		}, {
			id: '4',
			name: '4'
		}];

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		$scope.remove = function() {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
			$modalInstance.close();
		};

		$scope.submit = function() {
			angular.extend(widget, $scope.form);

			$modalInstance.close(widget);
		};

	}
])

// helper code
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
});
