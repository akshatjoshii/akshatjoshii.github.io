/** *************Angular controller JS*********************/
"use strict"; 
app.controller('ContactController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform, e) {
		e.preventDefault();
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method  : 'POST',
                url     : 'https://formspree.io/akshat2@gmail.com',
                data    : JSON.stringify($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.ok) { //success comes from the return json object
                    $scope.submitButtonDisabled = false;
		$scope.formData = null;
                    $scope.resultMessage = "Thanks! Your message has been received. I will reach you via email in 12 hours.";
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
					$scope.resultMessage = "Something went wrong! Message could not be submitted. Please try again!" +
                        " Or, email me at akshat2@gmail.com or call me at +91 9997969007";
                    $scope.result='bg-danger';
                }

            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed :( Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
});
