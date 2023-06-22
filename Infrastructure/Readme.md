# INFRAESTRUCTURE

[Go Back](../Readme.md)

## SPRINT C IMPLEMENTATION

On the previous Sprint, a different approach was taken. Firstly, since we were hosting the User Interface on an AWS S3 Bucket, we had some limitations.
Mainly in terms of redirecting and going back to a specific endpoint.

The approach right now was different, we are hosting the services, Warehouse Management, Logistics Management and the Planning Service on an Amazon EC2 instance with ubuntu 22.04. Then, we decided to host the User Interface also on a EC2 Instance.

The deployment pipeline works with the following flow:

- Get data from bitbucket
- Send data to the EC2 instance which hosts the services
  - Run stop_server - tells pm2 to shutdown each service
  - Run after_install - which either installs the needed node_modules or builds each project
  - Run start_server - which runs the pm2 commands to start each service
- Send data to the EC2 instance which hosts the User Interface
  - Run each script, regarding the condition that this deployment group is the UI one.

The tricky part here was writing the scripts in a way that it can distinguish each instance. CodeDeploy does not accept different appspec.yml files, so we had to use the Deployment group's name as a condition.

Both instances have a 16gb disk, we used to have only 8gb, but with so many packages installed to get things to run, we needed the extra space.
The instance we are using for the User Interface has 2gb of ram which, after creating the instance and using it for some time, seems like an overkill, nevertheless, since AWS and Cloud providers all around is about the On-Demand methodology and philosophy, changing the unit's specs on demand is relatively easy.

Also, the logistics' database is being hosted in Mongo Atlas.

If we had some extra time, we would have proceeded a little bit differently right from the start:

- We would have used CodeBuild to test and build the code. We have been using bitbucket, it worked well up to a point. It turned out faulty in the end due to a large amount of commits in such a short time. It kept trying to test and build for hours, for no reason whatsoever.
- We would have tried to simplify the whole process by using Elastic Beanstalk, a great tool to launch web apis.
- We would have created an instance specific for testing. Lack of knowledge at the time from the ASIST students in regards to the subject and also lack of time did not allow us to have this. It was painful for our computers to have one or more services running at the same time.

![physical](N2-PIV-FAST-DESIGN.svg "Infrastructure")
