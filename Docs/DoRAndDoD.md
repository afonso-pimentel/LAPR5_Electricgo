[GO BACK](../Readme.md)

## Definition of Ready
A task/feature/product backlog item is considered to be ready whenever a pull request to the main branch is opened and can be reviewed by the colleagues in the team.

The point here is that:

	* A pull request is only made whenever a feature is working, doing what it is supposed to. 
	
e.g. The List Warehouses feature must present a table on the front-end with all of the warehouses:

	* Allow to sort and filter. For that, it must communicate with the back-end Warehouse Management API through API calls. 
	* The Warehouse Management must communicate with the database to retrieve the data. 
	* This chain must work without failures in the middle. 
	* Tests must also pass before doing the pull request.

For us, none of the Use Cases are elligible to be discarded. 
e.g. If we consider that the List Trucks Use Case is not that essential, it means that the Edit Truck also is not essential. 
One is dependent on the other, if we want to Edit a Truck, we must allow the user to select the Truck he wants to edit from a Drop Down list. For that, we must be able to List Trucks.

## Definition of Done
A task/feature/product backlog item is considered to be done whenever a pull request has been reviewed and approved by at least one member of the team, the last build of the branch was successfull and the code is merged onto the main branch for the repository.

The point here is that:

	* The feature was working as described in the DoR.
	* There might be "code smells" and minor improvements that will be detected by the reviewers of the pull request in question. 
	* As regarded in the DoR, tests must be passing otherwise the pull request will not be allowed to merge to master, that was defined in our pipeline, it builds the project, runs the tests and something fails, it is not accepted.