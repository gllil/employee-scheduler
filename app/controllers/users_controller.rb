require 'pry'

class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def new
        @user = User.new
    end

    def create
        @user = User.create(user_params)
        @user.save
    end

    def index
        @users = User.all
        render json: @users
    end

    private

    def user_params
        params.permit(:email, :first_name, :last_name, :password, :password_confirmation, :job_title)
    end
end