# uwece651f16-new

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.0.0.

## Getting start by Vagrant + VirtualBox
1.  Install [VirtualBox](https://www.virtualbox.org) and [Vagrant](https://www.vagrantup.com/).

2.  Download and import our [carpool-dev.box]() file. 
    
        ```bash
        mengdongqis-MacBook-Pro:Desktop mengdongqi$ vagrant box add carpool-dev carpool-dev.box -f
        ==> box: Box file was not detected as metadata. Adding it directly…
        ==> box: Adding box 'carpool-dev' (v0) for provider: 
           box: Unpacking necessary files from: file:///Users/mengdongqi/Desktop/carpool-dev.box
        ==> box: Successfully added box 'carpool-dev' (v0) for 'virtualbox'!
        ```

3.  Git clone our [repo](https://bitbucket.org/uwece651f16/uwece651f16_js). 
    
        ```bash
        mengdongqis-MacBook-Pro:Developer mengdongqi$ git clone https://dongqi_meng@bitbucket.org/uwece651f16/uwece651f16_js.git 
        Cloning into 'uwece651f16_js'...
        remote: Counting objects: 258, done.
        remote: Compressing objects: 100% (225/225), done.
        remote: Total 258 (delta 88), reused 145 (delta 17)
        Receiving objects: 100% (258/258), 88.49 KiB | 0 bytes/s, done.
        Resolving deltas: 100% (88/88), done.
        Checking connectivity... done.
        ```

4.  Create a local env file and add `MYSQL_DEV_URL: 'mysql://root:root@localhost/carpool1_dev'` into local.env.js

        ```bash
        mengdongqis-MacBook-Pro:uwece651f16_js mengdongqi$ cd server/config/
        mengdongqis-MacBook-Pro:config mengdongqi$ cp local.env.sample.js local.env.js  
        ```

5.  Change directory to project working directory, and start vagrant box by `vagrant up`. Please make sure these ports are not used: `9000, 3306, 35729, 5858, 8080`.             

        ```bash
        mengdongqis-MacBook-Pro:uwece651f16_js mengdongqi$ vagrant up 
        Bringing machine 'default' up with 'virtualbox' provider...
        ==> default: Importing base box 'carpool-dev'...
        ==> default: Matching MAC address for NAT networking...
        ==> default: Setting the name of the VM: uwece651f16_js_default_1476210577303_17584
        ==> default: Clearing any previously set network interfaces...
        ==> default: Preparing network interfaces based on configuration...
           default: Adapter 1: nat
        ==> default: Forwarding ports...
           default: 9000 (guest) => 9000 (host) (adapter 1)
           default: 3306 (guest) => 3306 (host) (adapter 1)
           default: 35729 (guest) => 35729 (host) (adapter 1)
           default: 5858 (guest) => 5858 (host) (adapter 1)
           default: 8080 (guest) => 8080 (host) (adapter 1)
           default: 22 (guest) => 2222 (host) (adapter 1)
        ==> default: Running 'pre-boot' VM customizations...
        ==> default: Booting VM...
        ==> default: Waiting for machine to boot. This may take a few minutes...
           default: SSH address: 127.0.0.1:2222
           default: SSH username: vagrant
           default: SSH auth method: private key
           default: Warning: Remote connection disconnect. Retrying...
        ==> default: Machine booted and ready!
        ==> default: Checking for guest additions in VM...
           default: The guest additions on this VM do not match the installed version of
           default: VirtualBox! In most cases this is fine, but in rare cases it can
           default: prevent things such as shared folders from working properly. If you see
           default: shared folder errors, please make sure the guest additions within the
           default: virtual machine match the version of VirtualBox you have installed on
           default: your host and reload your VM.
           default: 
           default: Guest Additions Version: 4.3.36
           default: VirtualBox Version: 5.0
        ==> default: Mounting shared folders...
           default: /home/vagrant/uwece651f16_js => /Users/mengdongqi/Developer/uwece651f16_js
        ```

    Normally, this will do the following:
     - import the carpool-dev vbox
     - setting up the network, forward the ports to host machine  
     - install the all dev package dependencies 
    
    Hopefully, this will succeed, if not, figure it out, and delete the `.vagrant` directory, and please try `vagrant up` again.

6.  SSH into our dev environment and start the app by using `grunt serve` and open `localhost:9000` from your browser. 

        ```bash
        mengdongqis-MacBook-Pro:uwece651f16_js mengdongqi$ vagrant ssh
        vagrant@vagrant-ubuntu-trusty-64:~$ cd uwece651f16_js/
        vagrant@vagrant-ubuntu-trusty-64:~/uwece651f16_js$ grunt serve
        Running "serve" task
        .....
        ```

7.  Want to stop development? Just `vagrant halt` this virtual box. 

        ```bash
        vagrant@vagrant-ubuntu-trusty-64:~$ exit
        logout
        Connection to 127.0.0.1 closed.
        mengdongqis-MacBook-Pro:uwece651f16_js mengdongqi$ pwd
        /Users/mengdongqi/Developer/uwece651f16_js
        mengdongqis-MacBook-Pro:uwece651f16_js mengdongqi$ vagrant halt
        ==> default: Attempting graceful shutdown of VM...
        mengdongqis-MacBook-Pro:uwece651f16_js mengdongqi$ vagrant global-status
        id       name    provider   state    directory                                  
        --------------------------------------------------------------------------------
        6c557ca  default virtualbox poweroff /Users/mengdongqi/Developer/uwece651f16_js 
        ```

8.  Never want this development environment? Just destroy it. 

        ```bash
        mengdongqis-MacBook-Pro:uwece651f16_js mengdongqi$ vagrant destroy 6c557ca -f 
        ==> default: Destroying VM and associated drives...
        ```

## Getting Started step by step

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v0.12.0
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
