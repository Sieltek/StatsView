#!/bin/bash
sudo npm run build
sudo rm -r /var/www/html/*
sudo mv build/* /var/www/html/
sudo rm -r build/
sudo /etc/init.d/apache2 restart
