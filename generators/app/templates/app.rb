require "sinatra"
require "sinatra/activerecord"
require "sinatra/respond_to"
require "./config/environments" #database configuration
require "./models/model"        #Model class
require "csv"
<? if( templateEngine == "haml" ){ ?>require "haml"<? } ?>

set :public_dir, Proc.new { File.join(root, "public") }

Sinatra::Application.register Sinatra::RespondTo

helpers do
  def protected!
    return if authorized?
    headers["WWW-Authenticate"] = 'Basic realm="Restricted Area"'
    halt 401, "Not authorized\n"
  end

  def authorized?
    username = ENV["ADMIN_USERNAME"] || "admin"
    password = ENV["ADMIN_PASWORD"] || "password"
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    @auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == [username, password]
  end

  def model_params
    params.keep_if {| key, value | [<?- strongParams.join(", ") ?>].include? key }
  end
end

get "/" do
  <?= templateEngine ?> :index
end

post "/submit" do

  <? if( true == recaptcha ){ ?>res = Net::HTTP.post_form(
    URI.parse('https://www.google.com/recaptcha/api/siteverify'),
    {
      'secret'     => '6Lc3iyATAAAAAIniHC_zfq8d_abX_QoT2Yf0eUaI',
      'response'   => params["g-recaptcha-response"],
      'remoteip'   => request.ip
    }
  )

  response = JSON.parse(res.body)

  if response["success"] == true
<? } ?>
    @model = Model.new(model_params)
    if @model.save
      redirect :thakyou
    else
      redirect :error
    end
<? if( true == recaptcha ){ ?>
  else
   redirect "/"
  end<? } ?>
end

get "/thakyou" do
  <?= templateEngine ?> :thakyou
end

get "/error" do
  <?= templateEngine ?> :error
end

get "/admin" do
  protected!
  respond_to do |format|
    format.html do
      @models = Model.all
      <?= templateEngine ?> :admin
    end
    format.csv { Model.to_csv }
  end
end

after do
  # Close the connection after the request is done so that we don't
  # deplete the ActiveRecord connection pool.
  ActiveRecord::Base.connection.close
end
