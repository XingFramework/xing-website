server 'appserver2.lrdesign.com', user: 'root', roles: %w{web app}
set :branch, "production"
set :application, "xingframework.com"

set :rails_warmup_url, 'http://www.xingframework.com'

# set :use_sudo, true # <- depends on deployment
