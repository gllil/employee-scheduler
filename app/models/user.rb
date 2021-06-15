class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable
  has_many :workdays

  def full_name
    return self.first_name + " " + self.last_name
  end

  def initials
    return self.first_name[0] + self.last_name[0]
  end

end
