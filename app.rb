require 'sinatra/base'
require 'padrino-helpers'
set :environment, :development

before do
  if request.host.start_with? "www"
    redirect "http://ayounayang.com#{request.fullpath}", 301
  end
end

get '/' do
  erb :index
end

get '/resume' do
  erb :resume
end

get '/contact' do
  erb :contact
end

get "/work/:name" do 
  @project = "projects/_#{params[:name]}".to_sym
  erb :project
end

#error do
#  redirect '/'
#end

