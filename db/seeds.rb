require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do
    fake_name = Faker::FunnyName.name
    user = User.create(email: fake_name.split(" ")[0] + "_" + fake_name.split(" ")[1] + "@example.com", first_name: fake_name.split(" ")[0], last_name: fake_name.split(" ")[1], encrypted_password: "password", job_title: "Optical Admin")

    3.times do
        Workday.create(user_id: user.id, date: [Date.yesterday, Date.today, Date.tomorrow].sample, start_hour: rand(1..12), start_min: [0, 15, 30, 45].sample , start_am_or_pm: ["am", "pm"].sample, end_hour: rand(1..12), end_min: [0, 15, 30, 45].sample, end_am_or_pm: ["am", "pm"].sample)
    end
end