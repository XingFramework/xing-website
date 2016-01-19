server 'appserver2.lrdesign.com', user: 'root', roles: %w{web app}
set :branch, "staging"
set :application, "staging.xingframework.com"
set :rails_warmup_url, 'http://staging.xingframework.com'

#set :use_sudo, true #<- depends on deploy
