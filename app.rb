require 'sinatra'

configure :production do
  set :port, 80
end

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
  erb(:project) rescue pass
end

not_found do
  erb :notfound, :layout => :layout
end

error do
  erb :error, :layout => :layout
end

