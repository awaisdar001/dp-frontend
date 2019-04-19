# Django React Redux Frontend (DRRF)

microfrontend for DestinationPak.com

## Project Setup

1. Use the package manager [pip](https://pip.pypa.io/en/stable/) to install virtualenv.

```bash
pip install virtualenv
```
2. Create a virtual env & make sure you have `virtualenv` installed
```bash
virtualenv venv
```
3. Enable virtualenv
```bash
source venv/bin/activate
```
4. Install requirements
```bash
make requirements
```
5. Install Node Modules this will create node modules
```bash
make static
```
6. Run Djnago server
```bash
make run
```
7. Run Webpack Watcher
```bash
npm run hot
```

## Run Project
Running project is easy.
1. Run Django Server
```python
make run
```
2. Run Webpack watcher
```bash
npm run hot
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
