#  Building and running locally

Here it's described how to build and run the app locally.

## Installing Kubernetes in Docker Desktop

Open Docker Desktop Settings and enable Kubernetes.

## Build and deploy

### Build docker images
```
docker build -t local/ns-client-service:latest ./ns-client-service
docker build -t local/ns-contract-service:latest ./ns-contract-service
docker build -t local/ns-main-service:latest ./ns-main-service
```

### Deploy to Kubernetes

Configure Ingress

````
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
kubectl create secret tls tls-secret --key ./k8s/local/common/tls.key --cert ./k8s/local/common/tls.crt
````

This deploys to Kubernetes Postgresql specific for ns-contract-service and ns-contract-service itself. 
```
kubectl apply -f ./k8s/local/ns-client-service/db.yaml
kubectl apply -f ./k8s/local/ns-client-service/secret.yaml
kubectl apply -f ./k8s/local/ns-client-service/deployment.yaml
kubectl apply -f ./k8s/local/ns-client-service/service.yaml
kubectl apply -f ./k8s/local/ns-client-service/ingress.yaml

kubectl apply -f ./k8s/local/ns-contract-service/db.yaml
kubectl apply -f ./k8s/local/ns-contract-service/secret.yaml
kubectl apply -f ./k8s/local/ns-contract-service/deployment.yaml
kubectl apply -f ./k8s/local/ns-contract-service/service.yaml
kubectl apply -f ./k8s/local/ns-contract-service/ingress.yaml

kubectl apply -f ./k8s/local/ns-main-service/db.yaml
kubectl apply -f ./k8s/local/ns-main-service/secret.yaml
kubectl apply -f ./k8s/local/ns-main-service/deployment.yaml
kubectl apply -f ./k8s/local/ns-main-service/service.yaml
kubectl apply -f ./kkubectl get pods -n ingress-nginx8s/local/ns-main-service/ingress.yaml
```

Check pods state
```
kubectl get pods
```

Check services state
```
kubectl get services
```

Check ingress state
```
kubectl get pods -n ingress-nginx
```

### Configure host name
Open `hosts` file with Administrator permissions (`C:\Windows\System32\drivers\etc\hosts`) and add the following row into it
```
127.0.0.1 node-sample.local
```

### Opening the app

When everything is done, you can open in your browser
```
https://node-sample.local
```