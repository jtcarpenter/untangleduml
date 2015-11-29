# -*- mode: ruby -*-
# vi: set ft=ruby :
# 
# 
# == Dependencies ==
# 
# Install VirtualBox
# https://www.virtualbox.org/wiki/Downloads
# Install Vagrant
# https://www.vagrantup.com/downloads.html
# 
# == Set up ==
# 
# $ vagrant up
# 
# Add domain to hosts file on host machine:
# 192.168.33.22   www.starwood.vagrant
# 
# Make sure .htaccess paths match guest not host
# Make sure SITE_PATH in config matches guest not host
# 
# == Sequel Pro Settings ==
# 
# Show ssh settings
# 
# $ vagrant ssh-config
# 
# You may have to remove ip (192.168.33.33) from known hosts
# if an older version existed with same IP
# 
# $ vim ~/.ssh/subl ~/.ssh/known_hosts
# or
# $ ssh-keygen -R SERVER_IP_ADDRESS
# 
# MySQL Host: 127.0.0.1
# Username: root
# Password: <root_password>
# SSH Host: 192.168.33.33
# SSH User: vagrant
# SSH Key: vagrant
# SSH Port:
# 
# == Database ==
# 
# Import database
# Update application PHP database settings


@script = <<SCRIPT
# use single quotes instead of double quotes to make it work with special-character passwords
MYSQL_PASSWORD='123'
SITE_NAME="untangleduml"
SITE_ROOT="/var/www/${SITE_NAME}"
DOCUMENT_ROOT="${SITE_ROOT}"

# update / upgrade
sudo apt-get update
sudo apt-get -y upgrade

# install apache 2.5 and php 5.5
sudo apt-get install -y apache2
sudo apt-get install -y php5 php5-cli php5-mcrypt php5-intl libapache2-mod-php5 php5-memcached php5-imagick

# install mysql and give password to installer
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_PASSWORD"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_PASSWORD"
sudo apt-get -y install mysql-server
sudo apt-get install php5-mysql

# install nodejs
sudo apt-get -y install nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo apt-get -y install npm

# add site vhost
echo "
<VirtualHost *:80>
    ServerName ${SITE_NAME}.vagrant
    DocumentRoot $DOCUMENT_ROOT
    <Directory "$DOCUMENT_ROOT">
        DirectoryIndex index.php
        AllowOverride All
        Allow from all
    </Directory>
</VirtualHost>
" > /etc/apache2/sites-available/${SITE_NAME}.conf
a2enmod rewrite
a2dissite 000-default
a2ensite $SITE_NAME

# change web server user and group to vagrant
sed -i 's/www-data/vagrant/' /etc/apache2/envvars

# restart apache
service apache2 restart

# install git
sudo apt-get -y install git

# install Composer
curl -s https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
SCRIPT

Vagrant.configure("2") do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty64"

  # Create a private network, which allows host-only access to the machine using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.44"

  # config.vm.network "forwarded_port", guest: 80, host: 8085

  # Share an additional folder to the guest VM. The first argument is the path on the host to the actual folder.
  # The second argument is the path on the guest to mount the folder.
  config.vm.synced_folder "./", "/var/www/untangleduml", type: "nfs"

  # Define the provisioner
  config.vm.provision 'shell', inline: @script

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end
end
