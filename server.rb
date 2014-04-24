require 'sinatra'

set :root, File.dirname(__FILE__)
set :public_folder, File.join(settings.root, "lessons")
enable :static

get '/' do
  "Webgl, why you so difficult!"
end

before do
  headers "Content-Type" => "text/html; charset=utf-8"
end

get '/lesson/:num' do |n|
  fname = 'lesson' + n
  @js = fname + ".js"
  @css = fname + ".css"
  @title = #{'Webgl lesson ' + n}
  erb n.concat('/page').to_sym, :layout => :canvas
end

get '/3d/:scene' do |scene|
  @js = scene + ".js"
  @css = scene + ".css"
  @title = #{'The great ' + scene}
  erb '3d/'.concat(scene).to_sym, :layout => :canvas_three
end
