#  Building and running locally

Here it's described how to build and run the app locally.

## Installing Minikube

Install minikube on Windows machine (from PowerShell in Admin mode):
```
choco install minikube
minikube start
minikube addons enable ingress
```

This command sets up the environment variables in PowerShell to point Docker commands to the Docker daemon inside Minikube
```
& minikube -p minikube docker-env | Invoke-Expression
```

## Build and deploy

### Build docker images
```
docker build -t local/ns-contract-service:latest ./ns-contract-service
```

### Deploy to Kubernetes

This deploys to Kubernetes Postgresql specific for ns-contract-service and ns-contract-service itself. 
```
kubectl apply -f ./k8s/local/ns-contract-service/db.yaml
kubectl apply -f ./k8s/local/ns-contract-service/deployment.yaml
kubectl apply -f ./k8s/local/ns-contract-service/service.yaml
kubectl apply -f ./k8s/local/ns-contract-service/secret.yaml
```

Check pods state
```
kubectl get pods
```

Check services state
```
kubectl get services
```

Deploy ingress
```
kubectl create secret tls tls-secret --key ./k8s/local/common/tls.key --cert ./k8s/local/common/tls.crt
kubectl apply -f ./k8s/local/common/ingress.yaml
```

### Configure host name
Execute `minikube ip` and copy minikube IP address.
Open `hosts` file with Administrator permissions (`C:\Windows\System32\drivers\etc\hosts`) and add the following row into it
```
{minikube ip} node-sample.local
```

### Configure Tunnel and Expose Ingress
This command creates secure tunnel to the Minikube node, allowing external traffic to reach the NodePort and Service.*(Do not close the terminal after running.)*
```
minikube tunnel
```
To access Ingress over HTTPS from your local machine, run this command to set up a port-forward to the Ingress NGINX controller.
```
kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 443
```

When everything is done, you can open in your browser
```
https://node-sample.local/api/contract-service/contracts
```
It should return `[]` (empty contract list).