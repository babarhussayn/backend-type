# DevSecOps-SRE
# VPS
# Webmin
# jenkins or webHook
---
Yes, you can create a virtual server with Apache and use Nginx for the rest of the work. This is often done when hosting multiple websites with varied requirements on the same virtual machine¹. Here's a high-level overview of how you can set this up:

1. **Install Apache and PHP-FPM**: You can start by installing Apache and PHP-FPM¹. In addition to Apache and PHP-FPM, you will also need to install the PHP FastCGI Apache module, libapache2-mod-fastcgi, to support FastCGI web applications¹.

2. **Install Nginx**: Next, install and configure Nginx that will serve as the front end of your site².

3. **Configure Nginx and Apache to work together**: You can configure Nginx as both a web server and as a reverse proxy for Apache – all on a single server¹. Depending on the web application, code changes might be required to keep Apache reverse-proxy-aware, especially when SSL sites are configured¹. To avoid this, you can install an Apache module called mod_rpaf which rewrites certain environment variables so it appears that Apache is directly handling requests from web clients¹.

4. **Set different ports for each server**: That means you can leave port 80 for Nginx and assign Apache a different port².

5. **Configure Virtual Hosts**: You can then configure the virtual hosts. For example, you could tell Apache to listen on 127.0.0.1:8080 and instruct Nginx to reverse-proxy traffic to Apache while still serving static content².

Please note that this is a high-level overview and the actual steps may vary based on your specific requirements and system configuration. You may want to refer to detailed guides or tutorials for step-by-step instructions¹². Remember to always backup your data and configuration files before making any changes to your server configuration.

Source:
(1) How To Configure Nginx as a Web Server and Reverse Proxy for Apache on .... https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache-on-one-ubuntu-18-04-server.
(2) How to Configure nginx and apache on same server | HostAdvice. https://hostadvice.com/how-to/web-hosting/ubuntu/how-to-configure-nginx-and-apache-together-in-ubuntu/.
(3) How to manage and use Nginx Virtual host in Ubuntu. https://techvblogs.com/blog/manage-use-nginx-virtual-host-ubuntu.
(4) How to Create an Nginx Virtual Host (AKA Server Blocks). https://www.keycdn.com/support/nginx-virtual-host.
(5) How to create and manage Virtual Hosts in Nginx server. https://www.interserver.net/tips/kb/create-manage-virtual-hosts-nginx/.
