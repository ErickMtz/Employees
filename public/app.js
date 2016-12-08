(function() {
	var app = angular.module('company' ,[]);

	app.controller('MainController', function($scope, $http) {	

		$scope.formData = {};

		$scope.title = 'Employees';

		$http.get('api/employees')
		.then(function(response) {
			$scope.employees = response.data;
		}, function(response) {
			$scope.employees = 'Something went wrong';
		});

		$scope.search = function() {
			if($scope.search_employee_id) {
				$http.get('api/employees/' + $scope.search_employee_id)
				.then(function(response) {
					$scope.employees = response.data;
				}, function(response) {
					$scope.employees = "Something went wrong";
				});
			}
			else {
				$http.get('api/employees')
				.then(function(response) {
					$scope.employees = response.data;
				}, function(response) {
					$scope.employees = "Something went wrong";
				});
			}
		};

		$scope.newEmployee = function() {

			$scope.windowTitle = "Add a new Employee";
			$("#modalAddEmployee").modal("show");
		}

		$scope.addEmployee = function() {
			var newEmployee = {
				employee_id: $scope.employee_id,
				name: $scope.name,
				last_name: $scope.last_name,
				rfc: $scope.rfc,
				gender: $scope.gender,
				birthday: $scope.birthday,
				phone_number: $scope.phone_number,
				email: $scope.email,
				employment: $scope.employment,
				hire_date: $scope.hire_date,
				salary: $scope.salary
			}
			if(newEmployee.employee_id){
				
				$http.post('/api/employees',newEmployee)
				.then(function(response){
					$scope.employees = response.data;
					$http.get('api/employees')
					.then(function(response) {
						$scope.employees = response.data;
					}, function(response) {
						$scope.employees = 'Something went wrong';
					});
				}, function(response) {
					$scope.employees = "Something went wrong";
				});

				$scope.employee_id = '';
				$scope.name = '';
				$scope.last_name = '';
				$scope.rfc = '';
				$scope.gender = '';
				$scope.birthday = '';
				$scope.phone_number = '';
				$scope.email = '';
				$scope.employment = '';
				$scope.hire_date = '';
				$scope.salary = '';
			}
		}

		$scope.editEmployee = function() {
			$scope.windowTitle = 'Edit Employee';
			$("#modalEmployee").modal("show");
			if($scope.search_employee_id) {
				$http.get('api/employees/' + $scope.search_employee_id)
				.then(function(response) {
					$scope.FoundedEmployee = response.data;
				}, function(response) {
					$scope.employees = "Something went wrong";
				});
			}

			$scope.employee_id = $scope.FoundedEmployee[0].employee_id;
			$scope.name = $scope.FoundedEmployee[0].name;
			$scope.last_name = $scope.FoundedEmployee[0].last_name;
			$scope.rfc = $scope.FoundedEmployee[0].rfc;
			$scope.gender = $scope.FoundedEmployee[0].gender;
			$scope.birthday = $scope.FoundedEmployee[0].birthday;
			$scope.phone_number = $scope.FoundedEmployee[0].phone_number;
			$scope.email = $scope.FoundedEmployee[0].email;
			$scope.employment = $scope.FoundedEmployee[0].employment;
			$scope.hire_date = $scope.FoundedEmployee[0].hire_date;
			$scope.salary = $scope.FoundedEmployee[0].salary;
		}

		$scope.updateEmployee = function() {

			if($scope.employee_id) {

				var updatedEmployee = {
					employee_id: $scope.employee_id,
					name: $scope.name,
					last_name: $scope.last_name,
					rfc: $scope.rfc,
					gender: $scope.gender,
					birthday: $scope.birthday,
					phone_number: $scope.phone_number,
					email: $scope.email,
					employment: $scope.employment,
					hire_date: $scope.hire_date,
					salary: $scope.salary
				}

				$http.put('api/employees/' + $scope.employee_id, updatedEmployee)
				.then(function(response) {
					$scope.FoundedEmployee = response.data;
					$http.get('api/employees')
					.then(function(response) {
						$scope.employees = response.data;
						$scope.employee_id = '';
						$scope.name = '';
						$scope.last_name = '';
						$scope.rfc = '';
						$scope.gender = '';
						$scope.birthday = '';
						$scope.phone_number = '';
						$scope.email = '';
						$scope.employment = '';
						$scope.hire_date = '';
						$scope.salary = '';
					}, function(response) {
						$scope.employees = "Something went wrong";
					});
				}, function(response) {
					window.alert("Something went wrong");
				});


			}
		}

		$scope.deleteEmployee = function() {
			if($scope.employee_id) {
				$http.get('api/employees/' + $scope.employee_id)
				.then(function(response) {
					$scope.FoundedEmployee = response.data;
					$http.delete('api/employees/' + $scope.employee_id)
					.then(function(response) {
						$http.get('api/employees')
						.then(function(response) {
							$scope.employees = response.data;
							$scope.employee_id = '';
							$scope.name = '';
							$scope.last_name = '';
							$scope.rfc = '';
							$scope.gender = '';
							$scope.birthday = '';
							$scope.phone_number = '';
							$scope.email = '';
							$scope.employment = '';
							$scope.hire_date = '';
							$scope.salary = '';
						}, function(response) {
							$scope.employees = "Something went wrong";
						});
					}, function(response) {
						window.alert("Something went wrong");
					});
				}, function(response) {
					$scope.employees = "Something went wrong";
				});
			}
		}


		$scope.doubleClick = function(rowEmployee) {

			var foundedEmployee;
			$http.get('api/employees/' + rowEmployee.employee_id)
			.then(function(response) {
				$scope.FoundedEmployee = response.data; 

				$scope.employee_id = $scope.FoundedEmployee[0].employee_id;
				$scope.name = $scope.FoundedEmployee[0].name;
				$scope.last_name = $scope.FoundedEmployee[0].last_name;
				$scope.rfc = $scope.FoundedEmployee[0].rfc;
				$scope.gender = $scope.FoundedEmployee[0].gender;
				$scope.birthday = $scope.FoundedEmployee[0].birthday;
				$scope.phone_number = $scope.FoundedEmployee[0].phone_number;
				$scope.email = $scope.FoundedEmployee[0].email;
				$scope.employment = $scope.FoundedEmployee[0].employment;
				$scope.hire_date = $scope.FoundedEmployee[0].hire_date;
				$scope.salary = $scope.FoundedEmployee[0].salary;
				
				$("#modalDeleteUpdate").modal("show");
				$('#myTable').on('click', '.clickable-row', function(event) {
					$(this).addClass('active').siblings().removeClass('active');
				});
			}, function(response) {
				$scope.FoundedEmployee = "Something went wrong";
			});
		}

		$scope.cancel = function(){
			$scope.employee_id = '';
			$scope.name = '';
			$scope.last_name = '';
			$scope.rfc = '';
			$scope.gender = '';
			$scope.birthday = '';
			$scope.phone_number = '';
			$scope.email = '';
			$scope.employment = '';
			$scope.hire_date = '';
			$scope.salary = '';
		}
	});

})();