# Demo - Hello World
Demo - Hello World

# Install Docker Desktop
- https://docs.docker.com/docker-for-windows/install/
- https://docs.docker.com/docker-for-mac/install/
```
$ docker version
```

# Maven
```
$ mvn clean package
```

# Docker-Compose
```
$ docker-compose -f docker-compose-local.yml up
```

# Docker Images
```
$ docker images
```

# Azure
- https://azure.microsoft.com/es-es/global-infrastructure/geographies

## Azure - Create Free Account
- https://azure.microsoft.com/en-us/free/students
- https://azure.microsoft.com/en-us/free
- https://portal.azure.com

## Azure CLI Setup
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos

## Azure CLI
```
$ az upgrade
$ az version
$ az login
$ az account list-locations -o table
$ az group create -n UNMSM-TSW-TF -l southcentralus
$ az acr create -g UNMSM-TSW-TF -n evaluatesellergrupo1 --sku Basic --admin-enabled true
$ az acr login -n evaluatesellergrupo1
$ az acr show -n evaluatesellergrupo1 --query loginServer --output tsv
 ->evaluatesellergrupo1.azurecr.io
$ docker image ls
$ docker tag evaluate-seller:latest evaluatesellergrupo1.azurecr.io/evaluate-seller:latest
$ docker push evaluatesellergrupo1.azurecr.io/evaluate-seller:latest
$ az acr repository list -n evaluatesellergrupo1 -o table
$ az acr repository show-tags -n evaluatesellergrupo1 --repository evaluate-seller -o table
```

## Create App Service
- app-web-evaluacion-seller-backend

## CLI appsettings
```
$ az webapp config appsettings set --resource-group UNMSM-TSW-TF --name app-web-evaluacion-seller-backend --settings WEBSITES_PORT=8080
$ az webapp config appsettings set --resource-group UNMSM-TSW-TF --name app-web-evaluacion-seller-backend --settings ENVIRONMENT=production
$ az webapp config appsettings set --resource-group UNMSM-TSW-TF --name app-web-evaluacion-seller-backend --settings EVALUATE_SELLER_MYSQL=mysql://tws:Covid2021.@db-unmsm-tws-tfl.mysql.database.azure.com:3306/db-evaluacion-seller
```
- Restart appservice to take effect the config appsettings
```
$ az acr repository delete -n demospringbootrjara -t demo-spring-boot:latest
$ az group delete -n UNMSM-TSW
$ az logout
```