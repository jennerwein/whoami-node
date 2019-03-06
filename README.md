# whoami
A server that gives information about the container environment such as:

    Container hostname:  838fc2df13b5
    Container uptime:    8 min 20 sec

    Local address:       172.17.0.3 (port:8080)
    Standard gateway:    172.17.0.1 (eth0)
    Remote address       172.17.0.1 (port:59374)
    Public address:      94.134.37.169

    Operation system:    linux/4.15.0-45-generic
    Total memory:        8339918848
    Free memory:         1240027136

Start the **node app** with the command `node app/server` (of course, after `npm install`).
You can access the server via http://127.0.0.1:8080.

Start the **container** with 

`docker run -p 8080:8080 --name whoami -d jennerwein/whoami`
